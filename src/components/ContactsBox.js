import { Box } from './Box';

export class ContactsBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.email = options.email || 'srkarthik.designscape@gmail.com';
		this.phone = options.phone || '+7-000-000-00-00';
		const savedState = this.loadState();
		if (savedState) {
			this.email = savedState.email || this.email;
			this.phone = savedState.phone || this.phone;
		}
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
                <div class="entry">
                    <input type="email" name="email" value="${this.email}" placeholder="Email" />
                    <input type="tel" name="phone" value="${this.phone}" placeholder="Phone" />
                </div>
            </div>
        `;
	}

	saveState() {
		localStorage.setItem(`box-${this.id}`, JSON.stringify({ email: this.email, phone: this.phone }));
	}

	loadState() {
		return super.loadState();
	}

	applyChanges(inputs) {
		const emailInput = inputs.find((input) => input.name === 'email');
		const phoneInput = inputs.find((input) => input.name === 'phone');
		if (emailInput && emailInput.value.trim()) {
			this.email = emailInput.value.trim();
		}
		if (phoneInput && phoneInput.value.trim()) {
			this.phone = phoneInput.value.trim();
		}
		this.saveState();
	}
}
