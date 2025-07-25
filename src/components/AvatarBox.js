import { Box } from './Box';

export class AvatarBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.src = options.src || '/default.png';
		const savedState = this.loadState();
		if (savedState && savedState.src) {
			this.src = savedState.src;
		}
	}

	getInnerComponent() {
		return `<img class="avatar" src="${this.src}" alt="Avatar" />`;
	}

	getEditableComponent() {
		return `<div class="editable">
            <h1>Edit Avatar</h1>
            <div class="entry">
                <input type="file" name="avatar" accept="image/*" />
                <img class="avatar-preview" src="${this.src}" alt="Preview" />
            </div>
        </div>`;
	}

	saveState() {
		localStorage.setItem(`box-${this.id}`, JSON.stringify({ src: this.src }));
	}

	loadState() {
		const state = super.loadState();
		return state || { src: this.src };
	}

	applyChanges(inputs) {
		const fileInput = inputs.find((input) => input.name === 'avatar');
		if (fileInput && fileInput.files && fileInput.files[0]) {
			const file = fileInput.files[0];
			if (file.type.startsWith('image/')) {
				if (file.size > 5 * 1024 * 1024) {
					alert('File size exceeds 5MB');
					return;
				}
				const reader = new FileReader();
				reader.onload = () => {
					this.src = reader.result;
					this.saveState();
				};
				reader.readAsDataURL(file);
			}
		} else {
			this.saveState();
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
						if (file.size > 5 * 1024 * 1024) {
							alert('File size exceeds 5MB');
							return;
						}
						const reader = new FileReader();
						reader.onload = () => {
							this.src = reader.result;
							this.editable = true;
							const boxElement = this.root.querySelector(`#${this.id}`);
							if (boxElement) {
								boxElement.outerHTML = this.getComponent();
								this.attachEventListeners();
							}
						};
						reader.readAsDataURL(file);
					}
				}
			});
		}
	}
}
