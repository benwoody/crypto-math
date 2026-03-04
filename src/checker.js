import { saveProgress, getProgress } from './progress.js';

export function renderChecker(container, mod) {
  // Dynamic import for the module's exercises and visualizers
  import(`../modules/${mod.path}/exercises.js`).then(({ default: exerciseData }) => {
    import(`../modules/${mod.path}/visualizers.js`).then(({ mountVisualizers }) => {
      build(container, exerciseData, mod, mountVisualizers);
    }).catch(() => {
      build(container, exerciseData, mod, null);
    });
  });
}

function build(container, data, mod, mountVisualizers) {
  const state = {
    sections: {},
  };

  // Load saved progress
  const saved = getProgress(mod.id);

  // Progress bar
  const progressBar = el('div', 'progress-bar');
  const progressFill = el('div', 'progress-fill');
  progressBar.appendChild(progressFill);
  container.appendChild(progressBar);

  // Sections
  data.sections.forEach((section, si) => {
    const secDiv = el('div', 'section' + (si === 0 ? ' open' : ''));
    secDiv.id = section.id;

    // Header
    const header = el('div', 'section-header');
    const h2 = document.createElement('h2');
    h2.textContent = section.title;
    const badge = el('span', 'section-badge badge-waiting');
    badge.id = section.id + '-badge';
    badge.textContent = 'waiting';
    header.appendChild(h2);
    header.appendChild(badge);
    header.addEventListener('click', () => secDiv.classList.toggle('open'));
    secDiv.appendChild(header);

    // Content
    const content = el('div', 'section-content');

    // Mount visualizer before puzzles if this section has one
    if (mountVisualizers) {
      const vizContainer = document.createElement('div');
      content.appendChild(vizContainer);
      mountVisualizers(vizContainer, section.id);
    }

    // Puzzles
    section.puzzles.forEach(puzzle => {
      const puzzleDiv = el('div', 'puzzle');

      const label = el('div', 'puzzle-label');
      label.textContent = puzzle.label;
      puzzleDiv.appendChild(label);

      if (puzzle.description) {
        const desc = document.createElement('p');
        desc.textContent = puzzle.description;
        puzzleDiv.appendChild(desc);
      }

      // Input groups
      puzzle.inputs.forEach(group => {
        // Optional bonus box wrapper
        if (group.bonusBox) {
          const box = el('div', 'bonus-box');
          const bonusLabel = el('p', 'bonus-label');
          bonusLabel.textContent = group.bonusLabel || 'Bonus: Find the pattern';
          box.appendChild(bonusLabel);
          group.fields.forEach(field => {
            box.appendChild(makeInputRow(field));
          });
          puzzleDiv.appendChild(box);
        } else {
          group.fields.forEach(field => {
            puzzleDiv.appendChild(makeInputRow(field));
          });
        }
      });

      // Check button
      const btn = document.createElement('button');
      btn.className = 'check-btn';
      btn.textContent = 'Check Answers';
      btn.addEventListener('click', () => {
        let totalCorrect = 0;
        let totalFields = 0;

        puzzle.inputs.forEach(group => {
          const result = group.validate(getValues(group.fields));
          result.forEach((r, i) => {
            const field = group.fields[i];
            setFeedback(field.id + '_fb', r.correct, r.hint);
            const input = document.getElementById(field.id);
            if (input) input.className = r.correct ? 'correct' : 'wrong';
            totalFields++;
            if (r.correct) totalCorrect++;
          });
        });

        // Show explanation
        if (puzzle.explanation) {
          showExp(puzzle.id + '_exp', puzzle.explanationType || 'hint-exp', puzzle.explanation);
        }

        // Update section running total
        if (!state.sections[section.id]) {
          state.sections[section.id] = { correct: 0, total: 0 };
        }
        // Store this puzzle's results
        state.sections[section.id][puzzle.id] = { correct: totalCorrect, total: totalFields };

        // Sum all puzzles in this section
        let secCorrect = 0, secTotal = 0;
        for (const key in state.sections[section.id]) {
          if (key === 'correct' || key === 'total') continue;
          secCorrect += state.sections[section.id][key].correct;
          secTotal += state.sections[section.id][key].total;
        }
        state.sections[section.id].correct = secCorrect;
        state.sections[section.id].total = secTotal;

        updateBadge(section.id, secCorrect, secTotal);
        saveProgress(mod.id, section.id, secCorrect, secTotal);
        updateProgressBar();
      });
      puzzleDiv.appendChild(btn);

      // Explanation div
      const expDiv = el('div', 'explanation');
      expDiv.id = puzzle.id + '_exp';
      puzzleDiv.appendChild(expDiv);

      content.appendChild(puzzleDiv);
    });

    secDiv.appendChild(content);
    container.appendChild(secDiv);

    // Restore saved badge
    if (saved[section.id]) {
      const s = saved[section.id];
      state.sections[section.id] = { correct: s.correct, total: s.total };
      updateBadge(section.id, s.correct, s.total);
    }
  });

  // Summary section
  const summaryDiv = el('div', 'summary');
  summaryDiv.id = 'summarySection';
  summaryDiv.style.display = 'none';
  summaryDiv.innerHTML = '<h2>Your Foundation Map</h2><div class="score-grid" id="scoreGrid"></div><div class="ready-msg" id="readyMsg"></div>';
  container.appendChild(summaryDiv);

  updateProgressBar();

  function updateProgressBar() {
    const completedSections = Object.keys(state.sections).filter(k => state.sections[k] && state.sections[k].total > 0).length;
    const totalSections = data.sections.length;
    progressFill.style.width = (completedSections / totalSections * 100) + '%';
    if (completedSections === totalSections) showSummary();
  }

  function showSummary() {
    summaryDiv.style.display = 'block';
    const grid = document.getElementById('scoreGrid');
    const names = data.sections.map(s => s.shortName || s.title);
    grid.innerHTML = '';
    let totalC = 0, totalT = 0;
    data.sections.forEach((sec, i) => {
      const d = state.sections[sec.id] || { correct: 0, total: 1 };
      totalC += d.correct;
      totalT += d.total;
      const pct = d.correct / d.total;
      const color = pct === 1 ? 'var(--correct)' : pct >= 0.6 ? 'var(--hint)' : 'var(--wrong)';
      grid.innerHTML += `<div class="score-cell"><div class="label">${names[i]}</div><div class="value" style="color:${color}">${d.correct}/${d.total}</div></div>`;
    });
    const overall = totalC / totalT;
    const msg = document.getElementById('readyMsg');
    if (overall >= 0.85) {
      msg.style.background = 'var(--correct-bg)';
      msg.style.border = '1px solid rgba(74,222,128,0.2)';
      msg.style.color = 'var(--correct)';
      msg.textContent = "You're ready for Module 1. Your foundations are solid. Let's go learn some real crypto math.";
    } else if (overall >= 0.6) {
      msg.style.background = 'var(--hint-bg)';
      msg.style.border = '1px solid rgba(251,191,36,0.2)';
      msg.style.color = 'var(--hint)';
      msg.textContent = "You're close. Review the sections marked yellow or red, work through the explanations, and try those problems again. Then you're good for Module 1.";
    } else {
      msg.style.background = 'var(--wrong-bg)';
      msg.style.border = '1px solid rgba(248,113,113,0.2)';
      msg.style.color = 'var(--wrong)';
      msg.textContent = "Some foundations need work, but that's exactly what this module is for. Read through the explanations carefully, redo the problems, and take your time. No rush.";
    }
  }
}

function el(tag, className) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  return e;
}

function makeInputRow(field) {
  const row = el('div', 'input-row');
  const label = document.createElement('label');
  label.textContent = field.label;
  row.appendChild(label);

  if (field.type === 'dual') {
    // Two inputs (Q and R)
    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.id = field.id + '_q';
    input1.placeholder = field.placeholder1 || '?';
    row.appendChild(input1);
    const label2 = document.createElement('label');
    label2.textContent = field.label2 || 'R:';
    label2.style.minWidth = 'auto';
    row.appendChild(label2);
    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.id = field.id + '_r';
    input2.placeholder = field.placeholder2 || '?';
    row.appendChild(input2);
  } else {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = field.id;
    input.placeholder = field.placeholder || '?';
    if (field.width) input.style.width = field.width;
    row.appendChild(input);
  }

  const fb = el('span', 'feedback');
  fb.id = field.id + '_fb';
  row.appendChild(fb);

  return row;
}

function setFeedback(id, correct, text) {
  const fb = document.getElementById(id);
  if (!fb) return;
  fb.textContent = text || (correct ? '\u2713' : '\u2717');
  fb.className = 'feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
}

function showExp(id, type, html) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = html;
  el.className = 'explanation show ' + type;
}

function getValues(fields) {
  const vals = {};
  fields.forEach(f => {
    if (f.type === 'dual') {
      const q = document.getElementById(f.id + '_q');
      const r = document.getElementById(f.id + '_r');
      vals[f.id + '_q'] = q ? q.value.trim().toLowerCase() : '';
      vals[f.id + '_r'] = r ? r.value.trim().toLowerCase() : '';
    } else {
      const input = document.getElementById(f.id);
      vals[f.id] = input ? input.value.trim().toLowerCase() : '';
    }
  });
  return vals;
}

function updateBadge(secId, correct, total) {
  const pct = correct / total;
  const badge = document.getElementById(secId + '-badge');
  if (!badge) return;
  if (pct === 1) {
    badge.textContent = 'solid';
    badge.className = 'section-badge badge-correct';
  } else if (pct >= 0.6) {
    badge.textContent = 'mostly good';
    badge.className = 'section-badge badge-partial';
  } else {
    badge.textContent = 'review';
    badge.className = 'section-badge badge-review';
  }
}
