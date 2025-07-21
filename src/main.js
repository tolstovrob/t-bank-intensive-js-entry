import '@/main.css';
import { Box } from './components/Box';

const gridRows = 12,
	gridCols = 4,
	boxes = [
		{ name: 'avatar', row: 1, col: 1, rows: 1, cols: 1 },
		{ name: 'info', row: 1, col: 2, rows: 1, cols: 1 },
	];

function renderApp(root) {
	root.innerHTML = `
  <div>
    <main class="grid"></main>
  </div>
`;

	const grid = document.querySelector('main.grid');
	boxes.forEach((data) => grid.appendChild(new Box(data).el));
}

renderApp(document.querySelector('#app'));
