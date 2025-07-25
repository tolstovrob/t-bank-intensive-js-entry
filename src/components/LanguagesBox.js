import { Box } from './Box';

export class LanguagesBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.languages = options.languages;
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
                    <input type="text" name="language-${index}" value="${key}" placeholder="Language" />
                    <input type="number" name="level-${index}" value="${this.languages[key]}" placeholder="Level (0-100)" min="0" max="100" />
                `,
							)
							.join('')}
        </div>`;
	}

	applyChanges(inputs) {
		const newLanguages = {};
		for (let i = 0; i < inputs.length; i += 2) {
			const lang = inputs[i].value;
			const level = parseInt(inputs[i + 1].value) || 0;
			if (lang) {
				newLanguages[lang] = Math.max(0, Math.min(100, level));
			}
		}
		if (Object.keys(newLanguages).length > 0) {
			this.languages = newLanguages;
		}
	}
}
