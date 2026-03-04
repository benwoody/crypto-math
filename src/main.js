import './styles.css';
import { renderHome } from './pages/home.js';
import { renderModule } from './pages/module.js';

const app = document.getElementById('app');

function route() {
  const hash = window.location.hash || '#/';

  const moduleMatch = hash.match(/^#\/module\/(\d+)$/);
  if (moduleMatch) {
    renderModule(app, moduleMatch[1]);
    return;
  }

  renderHome(app);
}

window.addEventListener('hashchange', route);
route();
