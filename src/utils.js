export function styleObjectToString(styles) {
	return Object.entries(styles)
		.map(([key, value]) => {
			return `${key}: ${value};`;
		})
		.join('');
}

export function gridStateToGridTemplateAreas(state) {
	const [maxRow, maxColumn] = getGridSize(state);
	const grid = makeGridFromGridState(maxRow, maxColumn, state);
	return grid.map((row) => `'${row.map((cell) => (cell ? cell : '.')).join(' ')}'`).join('\n');
}

function getGridSize(state) {
	let maxRow = 0,
		maxColumn = 0;
	for (const key in state) {
		const { row, column, rowSpan, columnSpan } = state[key];
		maxRow = Math.max(maxRow, row + rowSpan);
		maxColumn = Math.max(maxColumn, column + columnSpan);
	}

	return [maxRow, maxColumn];
}

function makeGridFromGridState(maxRow, maxColumn, state) {
	const grid = Array.from({ length: maxRow }, () => Array.from({ length: maxColumn }, () => null));
	for (const key in state) {
		const { row, column, rowSpan, columnSpan } = state[key];
		for (let r = row; r < row + rowSpan; r++) {
			for (let c = column; c < column + columnSpan; c++) {
				grid[r][c] = key;
			}
		}
	}

	return grid;
}
