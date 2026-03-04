export function mountVisualizers(container, sectionId) {
  if (sectionId !== 'sec2') return;

  container.innerHTML = `
    <div class="visualizer">
      <div class="viz-title">× Multiplication Table mod p</div>
      <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 16px;">
        Every cell shows (row × col) mod p. Cells equal to 1 are <span style="color: var(--correct); font-weight: 700;">highlighted</span> — those are inverse pairs.
      </p>
      <div class="viz-controls">
        <label>p = <span class="viz-output" id="vizPrimeOut">7</span></label>
        <input type="range" id="vizPrime" min="2" max="19" value="7">
      </div>
      <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 8px;">
        <span id="vizPrimeNote"></span>
      </div>
      <div id="vizTable" style="overflow-x: auto;"></div>
      <div id="vizInverses" style="margin-top: 12px; font-size: 0.9rem; color: var(--text-dim);"></div>
    </div>
  `;

  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  function updateViz() {
    const p = parseInt(document.getElementById('vizPrime').value);
    document.getElementById('vizPrimeOut').textContent = p;

    const note = document.getElementById('vizPrimeNote');
    if (isPrime(p)) {
      note.innerHTML = `<span style="color: var(--correct);">${p} is prime</span> — every nonzero element has an inverse.`;
    } else {
      note.innerHTML = `<span style="color: var(--hint);">${p} is composite</span> — some elements lack inverses.`;
    }

    // Build table
    const tableDiv = document.getElementById('vizTable');
    let html = '<table style="border-collapse: collapse; font-family: \'JetBrains Mono\', monospace; font-size: 0.8rem;">';

    // Header row
    html += '<tr><th style="padding: 4px 8px; color: var(--text-dim); border: 1px solid var(--border);">×</th>';
    for (let j = 1; j < p; j++) {
      html += `<th style="padding: 4px 8px; color: var(--text-dim); border: 1px solid var(--border);">${j}</th>`;
    }
    html += '</tr>';

    // Data rows
    const inverses = [];
    for (let i = 1; i < p; i++) {
      html += `<tr><th style="padding: 4px 8px; color: var(--text-dim); border: 1px solid var(--border);">${i}</th>`;
      for (let j = 1; j < p; j++) {
        const val = (i * j) % p;
        const isOne = val === 1;
        const bg = isOne ? 'var(--correct-bg)' : 'transparent';
        const color = isOne ? 'var(--correct)' : 'var(--text)';
        const weight = isOne ? '700' : '400';
        html += `<td style="padding: 4px 8px; text-align: center; border: 1px solid var(--border); background: ${bg}; color: ${color}; font-weight: ${weight};">${val}</td>`;
        if (isOne && i <= j) {
          if (i === j) {
            inverses.push(`${i} is its own inverse`);
          } else {
            inverses.push(`${i} ↔ ${j}`);
          }
        }
      }
      html += '</tr>';
    }
    html += '</table>';
    tableDiv.innerHTML = html;

    // Inverse pairs summary
    const invDiv = document.getElementById('vizInverses');
    if (inverses.length > 0) {
      invDiv.innerHTML = '<strong>Inverse pairs:</strong> ' + inverses.join(', ');
    } else {
      invDiv.innerHTML = 'No inverses exist (all elements share a factor with the modulus).';
    }
  }

  document.getElementById('vizPrime').addEventListener('input', updateViz);
  updateViz();
}
