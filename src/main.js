import '@/main.css';

const gridRows = 12,
	gridCols = 4,
	boxes = [
		{ name: 'avatar', row: 0, col: 0, rows: 1, cols: 1 },
		{ name: 'info', row: 0, col: 1, rows: 1, cols: 1 },
	],
	grid = document.querySelector('main.grid');

function renderApp(root) {
	root.innerHTML = `
  <div>
    <main class="grid"></main>
  </div>
`;
}

renderApp(document.querySelector('#app'));
