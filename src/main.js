import '@/main.css';
import { Navbar } from '@/components/Navbar';

function renderApp(root) {
	const navbar = new Navbar(root);

	navbar.render();
}

renderApp(document.querySelector('#app'));
