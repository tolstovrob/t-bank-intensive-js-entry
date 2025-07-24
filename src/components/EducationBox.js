import { Box } from './Box';

export class EducationBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.schools = options.schools;
	}

	getInnerComponent() {
		return `<div class="education">
			${this.schools.map((school) => school.title).join('')}
		</div>`;
	}
}
