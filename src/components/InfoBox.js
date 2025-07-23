import { Box } from './Box';

export class InfoBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.name = options.name;
		this.position = options.position;
	}

	getInnerComponent() {
		return `<div class="info">
      <small>Hello 👋🏻 I’m</small>
      <div>
        <h1>${this.name}</h1>
        <p>${this.position}</p>
      </div>
    </div>`;
	}
}
