export function mountVisualizers(container, sectionId) {
  if (sectionId !== 'sec2') return;

  container.innerHTML = `
    <div class="visualizer">
      <div class="viz-title">\u27f3 Mod Visualizer</div>
      <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 16px;">
        Slide the number and the modulus. Watch how the remainder cycles.
      </p>
      <div class="viz-controls">
        <label>Number: <span class="viz-output" id="vizNumOut">17</span></label>
        <input type="range" id="vizNum" min="0" max="50" value="17">
      </div>
      <div class="viz-controls">
        <label>Mod: <span class="viz-output" id="vizModOut">5</span></label>
        <input type="range" id="vizMod" min="2" max="16" value="5">
      </div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; margin: 12px 0; text-align: center;">
        <span id="vizNumDisp">17</span> mod <span id="vizModDisp">5</span> = <span id="vizResult" style="color: var(--correct); font-weight: 700;">2</span>
      </div>
      <div class="number-line" id="vizNumberLine"></div>
    </div>
  `;

  function updateViz() {
    const n = parseInt(document.getElementById('vizNum').value);
    const m = parseInt(document.getElementById('vizMod').value);
    const r = n % m;
    document.getElementById('vizNumOut').textContent = n;
    document.getElementById('vizModOut').textContent = m;
    document.getElementById('vizNumDisp').textContent = n;
    document.getElementById('vizModDisp').textContent = m;
    document.getElementById('vizResult').textContent = r;

    const line = document.getElementById('vizNumberLine');
    line.innerHTML = '';
    for (let i = 0; i <= Math.min(n, 50); i++) {
      const cell = document.createElement('div');
      cell.className = 'num-cell';
      cell.textContent = i;
      if (i === n) cell.classList.add('remainder-highlight');
      else if (i % m === 0 && i > 0) cell.classList.add('highlight');
      line.appendChild(cell);
    }
  }

  document.getElementById('vizNum').addEventListener('input', updateViz);
  document.getElementById('vizMod').addEventListener('input', updateViz);
  updateViz();
}
