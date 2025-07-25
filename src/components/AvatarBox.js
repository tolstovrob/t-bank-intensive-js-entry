import { Box } from './Box';

export class AvatarBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.image = options.image || './avatar.jpg'; // Default image
	}

	getInnerComponent() {
		return `<img class="avatar" src="${this.image}" alt="Avatar" />`;
	}

	getEditableComponent() {
		return `<div class="editable-content">
            <h1>Edit Avatar</h1>
            <div class="entry">
                <input type="file" name="avatar" accept="image/*" />
                <img class="avatar-preview" src="${this.image}" alt="Preview" />
            </div>
        </div>`;
	}

	applyChanges(inputs) {
		const fileInput = inputs.find((input) => input.name === 'avatar');
		if (fileInput && fileInput.files && fileInput.files[0]) {
			const file = fileInput.files[0];
			if (file.type.startsWith('image/')) {
				// Revoke previous URL to prevent memory leaks
				if (this.image.startsWith('blob:')) {
					URL.revokeObjectURL(this.image);
				}
				this.image = URL.createObjectURL(file);
			}
		}
	}

	attachEventListeners() {
		super.attachEventListeners();
		const fileInput = this.root.querySelector(`#${this.id} input[name="avatar"]`);
		if (fileInput) {
			fileInput.addEventListener('change', () => {
				if (fileInput.files && fileInput.files[0]) {
					const file = fileInput.files[0];
					if (file.type.startsWith('image/')) {
						// Revoke previous URL to prevent memory leaks
						if (this.image.startsWith('blob:')) {
							URL.revokeObjectURL(this.image);
						}
						this.image = URL.createObjectURL(file);
						this.editable = true; // Stay in edit mode
						const boxElement = this.root.querySelector(`#${this.id}`);
						if (boxElement) {
							boxElement.outerHTML = this.getComponent();
							this.attachEventListeners(); // Re-attach listeners
						}
					}
				}
			});
		}
	}
}
