import '@/main.css';
import { Box } from '@/components/Box';
import { Grid } from '@/components/Grid';
import { gridState } from '@/store';
import { gridStateToGridTemplateAreas } from './utils';

function renderApp(root) {
	root.innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <main></main>
  </div>
`;

	const grid = new Grid(
		document.querySelector('main'),
		[new Box(null, 'info'), new Box(null, 'avatar'), new Box(null, 'experience')],
		gridStateToGridTemplateAreas(gridState),
	);
	grid.render();
}

renderApp(document.querySelector('#app'));
