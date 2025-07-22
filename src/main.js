import '@/main.css';
import { Navbar } from '@/components/Navbar';
import { Grid } from '@/components/Grid';
import { Box } from '@/components/Box';

const boxesOptions = [
	{ id: 'avatar', row: 1, col: 1, rows: 1, cols: 1 },
	{ id: 'info', row: 1, col: 2, rows: 1, cols: 1 },
	{ id: 'languages', row: 1, col: 3, rows: 1, cols: 2 },
	{ id: 'education', row: 2, col: 1, rows: 3, cols: 2 },
	{ id: 'interests', row: 2, col: 3, rows: 2, cols: 2 },
	{ id: 'contacts', row: 4, col: 3, rows: 1, cols: 2 },
	{ id: 'tools', row: 5, col: 1, rows: 3, cols: 1 },
	{ id: 'experience', row: 5, col: 2, rows: 3, cols: 3 },
];

function renderApp(root) {
	const navbar = new Navbar(root);
	navbar.render();

	const grid = new Grid(root);
	grid.render();

	const boxes = createBoxes(grid.getSelfSelector());
	boxes.forEach((box) => box.render());
}

function createBoxes(root) {
	return boxesOptions.map((opts) => new Box(root, opts));
}

renderApp(document.querySelector('#app'));
