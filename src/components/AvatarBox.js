import { Box } from './Box';

export class AvatarBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.src = options.src;
	}

	getInnerComponent() {
		return `<img src=${this.src} alt="logo" title="logo" class="avatar" />`;
	}

	getEditableComponent() {
		return `<div class="editable">
            <h1>Edit Avatar</h1>
            <input type="text" name="src" value="${this.src}" placeholder="Image URL" />
        </div>`;
	}

	applyChanges(inputs) {
		this.src = inputs[0].value || this.src;
	}
}
