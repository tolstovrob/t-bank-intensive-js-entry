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
}
