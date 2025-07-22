import { Component } from './Component';

export class Grid extends Component {
	constructor(root) {
		super(root);
	}

	getComponent() {
		return `<main>
      
    </main>`;
	}

	getSelfSelector() {
		return this.root.querySelector('main');
	}
}
