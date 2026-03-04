import { modules } from '../modules.js';
import { getProgress } from '../progress.js';

export function renderHome(app) {
  app.innerHTML = `
    <div class="container">
      <div class="landing-header">
        <h1>Crypto Math</h1>
        <p>A math workshop for engineers building on Ethereum. Not a textbook. Not a course. A workshop.</p>
      </div>
      <div class="module-grid" id="moduleGrid"></div>
    </div>
  `;

  const grid = document.getElementById('moduleGrid');

  modules.forEach(mod => {
    const card = document.createElement('div');
    card.className = 'module-card' + (mod.comingSoon ? ' coming-soon' : '');

    if (mod.comingSoon) {
      card.innerHTML = `
        <div class="module-id">Module ${mod.id}</div>
        <h3>${mod.title}</h3>
        <div class="module-desc">${mod.description}</div>
        <span class="coming-tag">coming soon</span>
      `;
    } else {
      const progress = getProgress(mod.id);
      const completed = Object.keys(progress).length;
      const total = mod.sections;
      let progressText = '';
      if (completed === 0) {
        progressText = 'not started';
      } else if (completed >= total) {
        progressText = `<span class="done">${completed}/${total} sections complete</span>`;
      } else {
        progressText = `${completed}/${total} sections`;
      }

      card.innerHTML = `
        <div class="module-id">Module ${mod.id}</div>
        <h3>${mod.title}</h3>
        <div class="module-desc">${mod.description}</div>
        <div class="module-progress">${progressText}</div>
      `;
      card.addEventListener('click', () => {
        window.location.hash = `#/module/${mod.id}`;
      });
    }

    grid.appendChild(card);
  });
}
