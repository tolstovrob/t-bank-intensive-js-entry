import './main.css';
import { Box } from './components/Box';

function renderApp(root) {
	root.innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <main></main>
  </div>
`;

	const TestBox = new Box(document.querySelector('main'));
	TestBox.render();
}

renderApp(document.querySelector('#app'));
