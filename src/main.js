import '@/main.css';
import { Navbar } from '@/components/Navbar';
import { Grid } from './components/Grid';

function renderApp(root) {
	const navbar = new Navbar(root);
	navbar.render();

	const boxesOptions = [];

	const grid = new Grid(root, boxesOptions);
	grid.render();
}

renderApp(document.querySelector('#app'));
