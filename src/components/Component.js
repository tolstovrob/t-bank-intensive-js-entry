export class Component {
	constructor(root) {
		this.root = root ?? document.querySelector('#app');
		if (!this.root) {
			console.error('Root element not found');
		}
	}

	render() {
		if (this.root) {
			const componentHtml = this.getComponent();
			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = componentHtml;
			this.root.append(...tempDiv.childNodes);
		} else {
			console.error('Cannot render: root element is null');
		}
	}

	getComponent() {
		return '';
	}
}
