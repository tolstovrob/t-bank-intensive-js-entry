import './style.css';

/**
 * Главная сетка-контейнер для Box. Представляет собой grid с 4 колонками и неограниченным числом строк (высчитывается динамически)
 */
export class Grid {
	/**
	 * @param {*} root - элемент DOM, в который примонтируется Box
	 */
	constructor(root, boxes) {
		this.root = root;
		this.boxes = boxes;
	}

	/**
	 * Функция для рендера компонента. Должна быть корректно переобределена для каждого унаследованного компонента
	 */
	render() {
		this.root.innerHTML = `<main>${this.boxes.map((box) => box.getComponent()).join('')}</main>`;
	}
}
