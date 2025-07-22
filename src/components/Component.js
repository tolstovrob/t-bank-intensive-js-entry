export class Component {
	constructor(root) {
		this.root = root ?? document.querySelector('#app');
	}

	render() {
		this.root.innerHTML += this.getComponent();
	}

	// NOTE(tolstovrob): overload this!
	getComponent() {}
}
