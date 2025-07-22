import { Component } from './Component';

export class Grid extends Component {
	constructor(el, boxes) {
		super(el);
		this.boxes = boxes;
	}

	getComponent() {
		return `<main>
      Grid
    </main>`;
	}
}
