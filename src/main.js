import '@/main.css';
import { Navbar } from '@/components/Navbar';
import { Grid } from '@/components/Grid';
import { Box } from '@/components/Box';
import { AvatarBox } from './components/AvatarBox';

const boxesOptions = [
	{ id: 'avatar', type: 'avatar', row: 1, col: 1, rows: 1, cols: 1, src: '/default.png' },
	{ id: 'info', type: 'info', row: 1, col: 2, rows: 1, cols: 1 },
	{ id: 'languages', type: 'languages', row: 1, col: 3, rows: 1, cols: 2 },
	{ id: 'education', type: 'education', row: 2, col: 1, rows: 3, cols: 2 },
	{ id: 'interests', type: 'interests', row: 2, col: 3, rows: 2, cols: 2 },
	{ id: 'contacts', type: 'contacts', row: 4, col: 3, rows: 1, cols: 2 },
	{ id: 'tools', type: 'tools', row: 5, col: 1, rows: 3, cols: 1 },
	{ id: 'experience', type: 'experience', row: 5, col: 2, rows: 3, cols: 3 },
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
	return boxesOptions.map((opts) => {
		switch (opts.type) {
			case 'avatar':
				return new AvatarBox(root, opts);

			default:
				return new Box(root, opts);
		}
	});
}

renderApp(document.querySelector('#app'));
