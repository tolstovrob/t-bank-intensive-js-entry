import { Component } from './Component';

export class Box extends Component {
	constructor(root, options) {
		super(root);
		this.row = options.row;
		this.col = options.col;
		this.rows = options.rows;
		this.cols = options.cols;
		this.id = options.id;
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
      ${this.getInnerComponent()}
    </div>`;
	}

	// NOTE(tolstovrob): overload this!
	getInnerComponent() {
		return `
      Hello from box ${this.id}
    `;
	}
}
