import { Box } from './Box';

export class AvatarBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.src = options.src;
	}

	getInnerComponent() {
		return `<img src=${this.src} alt="logo" title="logo" class="avatar" />`;
	}
}
