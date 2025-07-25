import { Box } from './Box';

export class InfoBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.name = options.name || 'Karthik SR';
		this.position = options.position || 'UI/UX Designer';
		const savedState = this.loadState();
		if (savedState) {
			this.name = savedState.name || this.name;
			this.position = savedState.position || this.position;
		}
	}

	getInnerComponent() {
		return `<div class="info">
            <small>Hello 👋🏻 I’m</small>
            <div>
                <h1>${this.name}</h1>
                <p>${this.position}</p>
            </div>
        </div>`;
	}

	getEditableComponent() {
		return `<div class="editable">
            <h1>Edit Info</h1>
            <input type="text" name="name" value="${this.name}" placeholder="Name" />
            <input type="text" name="position" value="${this.position}" placeholder="Position" />
        </div>`;
	}

	saveState() {
		localStorage.setItem(`box-${this.id}`, JSON.stringify({ name: this.name, position: this.position }));
	}

	loadState() {
		return super.loadState();
	}

	applyChanges(inputs) {
		const nameInput = inputs.find((input) => input.name === 'name');
		const positionInput = inputs.find((input) => input.name === 'position');
		if (nameInput && nameInput.value.trim()) {
			this.name = nameInput.value.trim();
		}
		if (positionInput && positionInput.value.trim()) {
			this.position = positionInput.value.trim();
		}
		this.saveState();
	}
}
