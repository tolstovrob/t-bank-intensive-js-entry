import { Box } from './Box';

export class LanguagesBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.languages = options.languages || {
			English: 100,
			Spanish: 90,
			French: 80,
		};
		const savedState = this.loadState();
		if (savedState && savedState.languages) {
			this.languages = savedState.languages;
		}
	}

	getInnerComponent() {
		return `<div class="languages">
                <h1>Languages</h1>
                <div>
                    ${Object.entries(this.languages)
											.map(
												([name, level]) => `
                        <p>${name}</p>
                        <div style="width: ${level}%"></div>
                    `,
											)
											.join('')}
                </div>
            </div>`;
	}

	getEditableComponent() {
		return `<div class="editable">
                <h1>Edit Languages</h1>
                ${Object.entries(this.languages)
									.map(
										([name, level], index) => `
                    <div class="entry" data-index="${index}">
                        <input type="text" name="language-name-${index}" value="${name}" placeholder="Language" />
                        <input type="number" name="language-level-${index}" value="${level}" placeholder="Level (0-100)" min="0" max="100" />
                        <button class="delete-entry" data-index="${index}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                    </div>
                `,
									)
									.join('')}
                ${
									Object.keys(this.languages).length < 3
										? `
                    <div class="action-buttons">
                        <button class="add-entry">Add Language</button>
                    </div>
                `
										: ''
								}
            </div>`;
	}

	saveState() {
		localStorage.setItem(`box-${this.id}`, JSON.stringify({ languages: this.languages }));
	}

	loadState() {
		const state = super.loadState();
		return state || { languages: this.languages };
	}

	applyChanges(inputs) {
		const newLanguages = {};
		for (let i = 0; i < inputs.length; i += 2) {
			const name = inputs[i].value.trim();
			const level = parseInt(inputs[i + 1].value);
			if (name && level >= 0 && level <= 100) {
				newLanguages[name] = level;
			}
		}
		this.languages = Object.fromEntries(Object.entries(newLanguages).slice(0, 3));
		this.saveState();
	}

	attachEventListeners() {
		super.attachEventListeners();
		const addButton = this.root.querySelector(`#${this.id} .add-entry`);
		if (addButton) {
			addButton.addEventListener('click', () => {
				if (Object.keys(this.languages).length < 3) {
					this.languages['New Language'] = 0;
					const boxElement = this.root.querySelector(`#${this.id}`);
					if (boxElement) {
						boxElement.outerHTML = this.getComponent();
						this.attachEventListeners();
					}
				}
			});
		}
		const deleteButtons = this.root.querySelectorAll(`#${this.id} .delete-entry`);
		deleteButtons.forEach((button) => {
			button.addEventListener('click', () => {
				const index = parseInt(button.getAttribute('data-index'));
				const name = Object.keys(this.languages)[index];
				delete this.languages[name];
				const boxElement = this.root.querySelector(`#${this.id}`);
				if (boxElement) {
					boxElement.outerHTML = this.getComponent();
					this.attachEventListeners();
				}
			});
		});
	}
}
