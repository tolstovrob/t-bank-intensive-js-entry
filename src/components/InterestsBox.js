import { Box } from './Box';

export class InterestsBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.tags = options.tags || [
			'branding',
			'design',
			'photography',
			'artificial intelligence',
			'illustration',
			'typography',
			'social networks',
			'research',
			'drone pilot',
			'games',
		];
		const savedState = this.loadState();
		if (savedState && savedState.tags) {
			this.tags = savedState.tags;
		}
	}

	getInnerComponent() {
		return `<div class="interests">
                <h1>Interests</h1>
                <div class="tags">
                    ${this.tags.map((tag) => `<span>${tag}</span>`).join('')}
                </div>
            </div>`;
	}

	getEditableComponent() {
		return `<div class="editable">
                <h1>Edit Interests</h1>
                <div class="entry">
                    <input type="text" name="tags" value="${this.tags.join(', ')}" placeholder="Tags (comma-separated)" />
                </div>
            </div>`;
	}

	saveState() {
		localStorage.setItem(`box-${this.id}`, JSON.stringify({ tags: this.tags }));
	}

	loadState() {
		const state = super.loadState();
		return state || { tags: this.tags };
	}

	applyChanges(inputs) {
		const tagsInput = inputs.find((input) => input.name === 'tags');
		if (tagsInput && tagsInput.value.trim()) {
			this.tags = tagsInput.value
				.split(',')
				.map((tag) => tag.trim())
				.filter((tag) => tag)
				.slice(0, 10);
		}
		this.saveState();
	}
}
