import '@/main.css';

function renderApp(root) {
	root.innerHTML = `
  <div>
    <h1>Tilted...</h1>
  </div>
`;
}

renderApp(document.querySelector('#app'));
