import { Box } from './Box';

export class LanguagesBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.languages = options.languages || {};
	}

	getInnerComponent() {
		return `<div class="languages">
            <h1>Languages</h1>
            <div>
                ${Object.keys(this.languages)
									.map(
										(key, index) => `
                    <p style="grid-row: ${index + 1}; grid-column: 1;">${key}</p>
                    <div style="grid-row: ${index + 1}; grid-column: 2; width: ${this.languages[key]}%;"></div>
                `,
									)
									.join('')}   
            </div>
        </div>`;
	}

	getEditableComponent() {
		return `<div class="editable">
            <h1>Edit Languages</h1>
            ${Object.keys(this.languages)
							.map(
								(key, index) => `
                    <div class="entry" data-index="${index}">
                        <input type="text" name="language-${index}" value="${key}" placeholder="Language" />
                        <input type="number" name="level-${index}" value="${this.languages[key]}" placeholder="Level (0-100)" min="0" max="100" />
                        <button class="delete-entry" data-index="${index}">Delete</button>
                    </div>
                `,
							)
							.join('')}
            ${Object.keys(this.languages).length < 3 ? `<button class="add-entry">Add Language</button>` : ''}
        </div>`;
	}

	applyChanges(inputs) {
		const newLanguages = {};
		const deleteIndices = new Set();
		const buttons = this.root.querySelector(`#${this.id}`)?.querySelectorAll('.delete-entry') || [];
		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				const index = parseInt(button.dataset.index);
				deleteIndices.add(index);
				this.editable = true;
				const boxElement = this.root.querySelector(`#${this.id}`);
				if (boxElement) {
					boxElement.innerHTML = this.getComponent();
					this.attachEventListeners();
				}
			});
		});

		for (let i = 0, index = 0; i < inputs.length; i += 2, index++) {
			if (deleteIndices.has(index)) continue;
			const lang = inputs[i]?.value;
			const level = parseInt(inputs[i + 1]?.value) || 0;
			if (lang) {
				newLanguages[lang] = Math.max(0, Math.min(100, level));
			}
		}

		if (Object.keys(newLanguages).length < 3) {
			const addButton = this.root.querySelector(`#${this.id} .add-entry`);
			if (addButton) {
				addButton.addEventListener('click', () => {
					newLanguages['New Language'] = 0;
					this.languages = newLanguages;
					this.editable = true;
					const boxElement = this.root.querySelector(`#${this.id}`);
					if (boxElement) {
						boxElement.innerHTML = this.getComponent();
						this.attachEventListeners();
					}
				});
			}
		}

		if (Object.keys(newLanguages).length > 0) {
			this.languages = Object.fromEntries(Object.entries(newLanguages).slice(0, 3));
		}
	}

	attachEventListeners() {
		super.attachEventListeners();
		const buttons = this.root.querySelector(`#${this.id}`)?.querySelectorAll('.delete-entry, .add-entry') || [];
		buttons.forEach((button) => {
			if (button.classList.contains('delete-entry')) {
				button.addEventListener('click', () => {
					const index = parseInt(button.dataset.index);
					const keys = Object.keys(this.languages);
					if (keys[index]) {
						delete this.languages[keys[index]];
						this.editable = true;
						const boxElement = this.root.querySelector(`#${this.id}`);
						if (boxElement) {
							boxElement.innerHTML = this.getComponent();
							this.attachEventListeners();
						}
					}
				});
			} else if (button.classList.contains('add-entry')) {
				button.addEventListener('click', () => {
					if (Object.keys(this.languages).length < 3) {
						this.languages['New Language'] = 0;
						this.editable = true;
						const boxElement = this.root.querySelector(`#${this.id}`);
						if (boxElement) {
							boxElement.innerHTML = this.getComponent();
							this.attachEventListeners();
						}
					}
				});
			}
		});
	}
}
