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
		const fields = [];
		if (this.email) fields.push(`<span>${this.email}</span>`);
		if (this.phone) fields.push(`<span>${this.phone}</span>`);

		return `<div class="contacts">
			<h1>Let's chat! I'm ready to work on exciting projects</h1>
			<div>
			${fields.join(fields.length > 1 ? '<span class="separator"></span>' : '')}
			</div>
		</div>`;
	}

	getEditableComponent() {
		return `
            <div class="editable">
                <h1>Edit Contacts</h1>
                <div class="entry">
                    <div class="input-group">
                        <input type="email" name="email" value="${this.email || ''}" placeholder="Email" />
                        <button class="delete-field" data-field="email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                    </div>
                    <div class="input-group">
                        <input type="tel" name="phone" value="${this.phone || ''}" placeholder="Phone" />
                        <button class="delete-field" data-field="phone">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                    </div>
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
		this.email = emailInput && emailInput.value.trim() ? emailInput.value.trim() : '';
		this.phone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : '';
		this.saveState();
	}

	attachEventListeners() {
		super.attachEventListeners();
		const deleteButtons = this.root.querySelectorAll(`#${this.id} .delete-field`);
		deleteButtons.forEach((button) => {
			button.addEventListener('click', () => {
				const field = button.getAttribute('data-field');
				if (field === 'email') this.email = '';
				if (field === 'phone') this.phone = '';
				this.saveState();
				const boxElement = this.root.querySelector(`#${this.id}`);
				if (boxElement) {
					boxElement.outerHTML = this.getComponent();
					this.attachEventListeners();
				}
			});
		});
	}
}
