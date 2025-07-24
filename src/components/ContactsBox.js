import { Box } from './Box';

export class ContactsBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.email = options.email;
		this.phone = options.phone;
	}

	getInnerComponent() {
		return `<div class="contacts">
			<h1>Let's chat! I'm ready to work on exciting projects</h1>
			<div>
				<span>${this.email ?? ''}</span>
				${this.email && this.phone ? '<div class="separator"></div>' : ''}
				<span>${this.phone ?? ''}</span>
			</div>
		</div>`;
	}
}
