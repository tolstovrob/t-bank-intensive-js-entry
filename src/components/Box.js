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
