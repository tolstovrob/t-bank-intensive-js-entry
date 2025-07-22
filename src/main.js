import '@/main.css';

function renderApp(root) {
	root.innerHTML = `
  <nav></nav>
  <main></main>
`;
}

renderApp(document.querySelector('#app'));
