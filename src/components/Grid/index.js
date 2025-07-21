import { styleObjectToString } from '@/utils';
import './style.css';

/**
 * Главная сетка-контейнер для Box. Представляет собой grid с 4 колонками и неограниченным числом строк (высчитывается динамически)
 */
export class Grid {
	/**
	 * @param {*} root - элемент DOM, в который примонтируется Grid
	 * @param {*} boxes - список коробок, которые будет использовать Grid
	 * @param {*} areas - строка с областями
	 */
	constructor(root = null, boxes, areas) {
		this.root = root;
		this.boxes = boxes;
		this.areas = areas;

		this.styles = {
			...(areas && { 'grid-template-areas': areas }),
		};
	}

	render() {
		// TODO(tolstovrob): replace mock grid-template-areas with actual reevaluation
		this.root.innerHTML = `<main class="grid" style="${styleObjectToString(this.styles)}">
  ${this.boxes.map((box) => box.getComponent()).join('')}
</main>`;
	}
}
