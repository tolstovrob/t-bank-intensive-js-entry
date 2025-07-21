import { styleObjectToString } from '@/utils';
import './style.css';

/**
 * Компонент для обёртки блоков. В чистом виде не используется, является базовым классом для других типов
 */
export class Box {
	/**
	 * @param {*} root - элемент DOM, в который примонтируется Box
	 * @param {*} gridArea - CSS-свойство gridArea, которое связано с соответствующим Grid
	 */
	constructor(root = null, gridArea) {
		this.root = root;
		this.styles = {
			...(gridArea && { 'grid-area': gridArea }),
		};
	}

	/**
	 * Функция для рендера компонента. Должна быть корректно переобределена для каждого унаследованного компонента
	 */
	render() {
		this.root.innerHTML = getComponent();
	}

	getComponent() {
		return `<div class="box" style="${styleObjectToString(this.styles)}">
  Hello from Box
</div>`;
	}
}
