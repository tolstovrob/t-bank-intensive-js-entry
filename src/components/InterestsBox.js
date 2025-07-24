import { Box } from './Box';

export class InterestsBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.tags = options.tags;
	}

	getInnerComponent() {
		return `<div class="interests">
			<h1>Interests</h1>
			<div class="tags">${this.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
		</div>`;
	}
}
