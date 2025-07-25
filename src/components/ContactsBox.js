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

	getEditableComponent() {
		return `<div class="editable">
            <h1>Edit Contacts</h1>
            <input type="email" name="email" value="${this.email ?? ''}" placeholder="Email" />
            <input type="tel" name="phone" value="${this.phone ?? ''}" placeholder="Phone" />
        </div>`;
	}

	applyChanges(inputs) {
		this.email = inputs[0].value || this.email;
		this.phone = inputs[1].value || this.phone;
	}
}
