import { Box } from './Box';

export class InterestsBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.tags = options.tags || [];
	}

	getInnerComponent() {
		return `<div class="interests">
            <h1>Interests</h1>
            <div class="tags">${this.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
        </div>`;
	}

	getEditableComponent() {
		return `<div class="editable">
            <h1>Edit Interests</h1>
            <input type="text" name="tags" value="${this.tags.slice(0, 10).join(', ')}" placeholder="Interests (comma-separated, max 10)" />
        </div>`;
	}

	applyChanges(inputs) {
		const tags = inputs[0].value
			.split(',')
			.map((t) => t.trim())
			.filter((t) => t)
			.slice(0, 10);
		if (tags.length > 0) {
			this.tags = tags;
		}
	}
}
