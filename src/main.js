import '@/main.css';
import { Navbar } from '@/components/Navbar';
import { Grid } from './components/Grid';

function renderApp(root) {
	const navbar = new Navbar(root);
	navbar.render();

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

	const grid = new Grid(root, boxesOptions);
	grid.render();
}

renderApp(document.querySelector('#app'));
