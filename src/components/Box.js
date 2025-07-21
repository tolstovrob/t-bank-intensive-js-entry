export class Box {
	constructor({ name, row, col, rows, cols }) {
		this.name = name;
		this.row = row;
		this.col = col;
		this.rows = rows;
		this.cols = cols;

		this.el = document.createElement('div');
		this.el.className = 'box';
		this.el.innerHTML = `<div class="resize-handle">${name}</div>`;

		this.render();
	}

	render() {
		this.el.style.gridColumn = `${this.col} / span ${this.colSpan}`;
		this.el.style.gridRow = `${this.row} / span ${this.rowSpan}`;
	}
}
