import { Box } from './Box';

export class InfoBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.name = options.name;
		this.position = options.position;
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

	applyChanges(inputs) {
		this.name = inputs[0].value || this.name;
		this.position = inputs[1].value || this.position;
	}
}
