import { Box } from './Box';

export class ContactsBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.email = options.email || '';
		this.phone = options.phone || '';
	}

	getInnerComponent() {
		return `<div class="contacts">
            <h1>Let's chat! I'm ready to work on exciting projects</h1>
            <div>
                <span>${this.email}</span>
                ${this.email && this.phone ? '<div class="separator"></div>' : ''}
                <span>${this.phone}</span>
            </div>
        </div>`;
	}

	getEditableComponent() {
		return `<div class="editable">
            <h1>Edit Contacts</h1>
            ${
							this.email
								? `
                <div class="entry" data-type="email">
                    <input type="email" name="email" value="${this.email}" placeholder="Email" />
                    <button class="delete-entry" data-type="email">Delete Email</button>
                </div>`
								: ''
						}
            ${
							this.phone
								? `
                <div class="entry" data-type="phone">
                    <input type="tel" name="phone" value="${this.phone}" placeholder="Phone" />
                    <button class="delete-entry" data-type="phone">Delete Phone</button>
                </div>`
								: ''
						}
            <div class="action-buttons">
                ${!this.email ? `<button class="add-entry" data-type="email">Add Email</button>` : ''}
                ${!this.phone ? `<button class="add-entry" data-type="phone">Add Phone</button>` : ''}
            </div>
        </div>`;
	}

	applyChanges(inputs) {
		const deleteTypes = new Set();
		const buttons = this.root.querySelector(`#${this.id}`)?.querySelectorAll('.delete-entry') || [];
		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				const type = button.dataset.type;
				deleteTypes.add(type);
				this.editable = true;
				const boxElement = this.root.querySelector(`#${this.id}`);
				if (boxElement) {
					boxElement.innerHTML = this.getComponent();
					this.attachEventListeners();
				}
			});
		});

		let newEmail = this.email;
		let newPhone = this.phone;
		inputs.forEach((input) => {
			if (input.name === 'email' && !deleteTypes.has('email')) {
				newEmail = input.value || this.email;
			}
			if (input.name === 'phone' && !deleteTypes.has('phone')) {
				newPhone = input.value || this.phone;
			}
		});

		if (deleteTypes.has('email')) {
			newEmail = '';
		}
		if (deleteTypes.has('phone')) {
			newPhone = '';
		}

		this.email = newEmail;
		this.phone = newPhone;

		const addButtons = this.root.querySelector(`#${this.id}`)?.querySelectorAll('.add-entry') || [];
		addButtons.forEach((button) => {
			button.addEventListener('click', () => {
				if (button.dataset.type === 'email' && !this.email) {
					this.email = '';
				} else if (button.dataset.type === 'phone' && !this.phone) {
					this.phone = '';
				}
				this.editable = true;
				const boxElement = this.root.querySelector(`#${this.id}`);
				if (boxElement) {
					boxElement.innerHTML = this.getComponent();
					this.attachEventListeners();
				}
			});
		});
	}

	attachEventListeners() {
		super.attachEventListeners();
		const buttons = this.root.querySelector(`#${this.id}`)?.querySelectorAll('.delete-entry, .add-entry') || [];
		buttons.forEach((button) => {
			if (button.classList.contains('delete-entry')) {
				button.addEventListener('click', () => {
					const type = button.dataset.type;
					if (type === 'email') {
						this.email = '';
					} else if (type === 'phone') {
						this.phone = '';
					}
					this.editable = true;
					const boxElement = this.root.querySelector(`#${this.id}`);
					if (boxElement) {
						boxElement.innerHTML = this.getComponent();
						this.attachEventListeners();
					}
				});
			} else if (button.classList.contains('add-entry')) {
				button.addEventListener('click', () => {
					if (button.dataset.type === 'email' && !this.email) {
						this.email = '';
					} else if (button.dataset.type === 'phone' && !this.phone) {
						this.phone = '';
					}
					this.editable = true;
					const boxElement = this.root.querySelector(`#${this.id}`);
					if (boxElement) {
						boxElement.innerHTML = this.getComponent();
						this.attachEventListeners();
					}
				});
			}
		});
	}
}
