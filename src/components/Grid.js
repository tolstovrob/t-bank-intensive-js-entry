import { Component } from './Component';

export class Grid extends Component {
	constructor(root) {
		super(root);
	}

	getComponent() {
		return `<div class="main-wrapper"><main></main></div>`;
	}

	getSelfSelector() {
		return this.root.querySelector('main');
	}
}
