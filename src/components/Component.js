export class Component {
	constructor(el) {
		this.el = el ?? document.querySelector('#app');
	}

	render() {
		this.el.innerHTML += this.getComponent();
	}

	// NOTE(tolstovrob): overload this!
	getComponent() {}
}
