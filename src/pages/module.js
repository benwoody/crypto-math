import { marked } from 'marked';
import { modules } from '../modules.js';
import { renderChecker } from '../checker.js';
import { saveUI, getUI } from '../progress.js';

export function renderModule(app, moduleId) {
  const mod = modules.find(m => m.id === moduleId);
  if (!mod || mod.comingSoon) {
    app.innerHTML = '<div class="container"><p>Module not found.</p></div>';
    return;
  }

  app.innerHTML = `
    <div class="container">
      <header>
        <h1>Module ${mod.id}: ${mod.title}</h1>
        <p>${mod.description}</p>
      </header>
      <nav class="module-nav">
        <a class="back-link" id="backLink">&larr; All Modules</a>
        <button class="tab-btn active" data-tab="lesson" id="tabLesson">Lesson</button>
        <button class="tab-btn" data-tab="solve" id="tabSolve">Solve</button>
      </nav>
      <div id="tabContent"></div>
    </div>
  `;

  const backLink = document.getElementById('backLink');
  const tabLesson = document.getElementById('tabLesson');
  const tabSolve = document.getElementById('tabSolve');
  const tabContent = document.getElementById('tabContent');

  backLink.addEventListener('click', () => {
    window.location.hash = '#/';
  });

  const savedModUI = getUI(mod.id);
  let currentTab = savedModUI.tab || 'lesson';
  let lessonLoaded = false;
  let solveLoaded = false;

  function setTab(tab) {
    currentTab = tab;
    tabLesson.classList.toggle('active', tab === 'lesson');
    tabSolve.classList.toggle('active', tab === 'solve');
    saveUI(mod.id, { ...getUI(mod.id), tab });

    if (tab === 'lesson') {
      showLesson();
    } else {
      showSolve();
    }
  }

  async function showLesson() {
    if (!lessonLoaded) {
      tabContent.innerHTML = '<p style="color: var(--text-dim);">Loading lesson...</p>';
      try {
        const resp = await fetch(`/modules/${mod.path}/lesson.md`);
        const md = await resp.text();
        tabContent.innerHTML = `<div class="lesson-content">${marked(md)}</div>`;
        lessonLoaded = true;
      } catch {
        tabContent.innerHTML = '<p style="color: var(--wrong);">Could not load lesson.</p>';
      }
    } else {
      // Already loaded, just make visible if hidden
      tabContent.querySelector('.lesson-content').style.display = '';
      const solver = tabContent.querySelector('.solver-content');
      if (solver) solver.style.display = 'none';
    }
  }

  function showSolve() {
    // Hide lesson if present
    const lesson = tabContent.querySelector('.lesson-content');
    if (lesson) lesson.style.display = 'none';

    let solver = tabContent.querySelector('.solver-content');
    if (!solver) {
      solver = document.createElement('div');
      solver.className = 'solver-content';
      tabContent.appendChild(solver);
      renderChecker(solver, mod);
      solveLoaded = true;
    } else {
      solver.style.display = '';
    }
  }

  tabLesson.addEventListener('click', () => setTab('lesson'));
  tabSolve.addEventListener('click', () => setTab('solve'));

  setTab(currentTab);
}
