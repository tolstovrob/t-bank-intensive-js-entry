import '@/main.css';
import { Navbar } from '@/components/Navbar';
import { Grid } from './components/Grid';

function renderApp(root) {
	const navbar = new Navbar(root);
	navbar.render();

	const boxes = [];

	const grid = new Grid(root, boxes);
	grid.render();
}

renderApp(document.querySelector('#app'));
