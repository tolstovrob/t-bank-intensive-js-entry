import '@/main.css';
import { Box } from '@/components/Box';
import { Grid } from '@/components/Grid';

function renderApp(root) {
	root.innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <main></main>
  </div>
`;

	const grid = new Grid(
		document.querySelector('main'),
		[new Box(null, 'test1'), new Box(null, 'test2'), new Box(null, 'test3')],
		"'test1 test1' 'test2 test3'",
	);
	grid.render();
}

renderApp(document.querySelector('#app'));
