import '@/main.css';
import { Navbar } from '@/components/Navbar';
import { Grid } from './components/Grid';

function renderApp(root) {
	const navbar = new Navbar(root);
	navbar.render();

	const grid = new Grid(root, []);
	grid.render();
}

renderApp(document.querySelector('#app'));
