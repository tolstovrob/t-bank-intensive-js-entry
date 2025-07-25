import { Component } from './Component';

export class Box extends Component {
	constructor(root, options) {
		super(root);
		this.row = options.row;
		this.col = options.col;
		this.rows = options.rows;
		this.cols = options.cols;
		this.id = options.id;
		this.editable = false;
	}

	render() {
		super.render();
		this.attachEventListeners();
	}

	getComponent() {
		return `<div class="box" id="${this.id}" style="
            grid-row: ${this.row} / span ${this.rows};
            grid-column: ${this.col} / span ${this.cols};
            aspect-ratio: ${this.cols} / ${this.rows};
        ">
            <button id="edit-${this.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
            </button>
            ${this.editable ? this.getEditableComponent() : this.getInnerComponent()}
        </div>`;
	}

	getInnerComponent() {
		return `Hello from box ${this.id}`;
	}

	getEditableComponent() {
		return `<div class="editable">
            <h1>Edit Box ${this.id}</h1>
            <div>Editable content for box ${this.id}</div>
        </div>`;
	}

	applyChanges(inputs) {
		// To be overridden by subclasses
	}

	attachEventListeners() {
		const button = this.root.querySelector(`#edit-${this.id}`);
		if (button) {
			button.addEventListener('click', () => {
				console.log(`Edit button clicked for box ${this.id}, editable: ${this.editable}`);
				if (this.editable) {
					const inputs = this.root.querySelector(`#${this.id}`)?.querySelectorAll('input, textarea') || [];
					this.applyChanges(Array.from(inputs));
				}
				this.editable = !this.editable;
				const boxElement = this.root.querySelector(`#${this.id}`);
				if (boxElement) {
					boxElement.innerHTML = this.getComponent();
					this.attachEventListeners(); // Re-attach after re-render
				} else {
					console.error(`Box element with id ${this.id} not found`);
				}
			});
		} else {
			console.error(`Edit button with id edit-${this.id} not found`);
		}
	}
}
