import './style.css';

/**
 * Компонент для обёртки блоков. В чистом виде не используется, является базовым классом для других типов
 */
export class Box {
	/**
	 * @param {*} root - элемент DOM, в который примонтируется Box
	 */
	constructor(root) {
		this.root = root;
	}

	/**
	 * Функция для рендера компонента. Должна быть корректно переобределена для каждого унаследованного компонента
	 */
	render() {
		this.root.innerHTML = getComponent();
	}

	getComponent() {
		return `<div class="box">
  Hello from Box
</div>`;
	}
}
