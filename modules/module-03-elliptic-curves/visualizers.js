export function mountVisualizers(container, sectionId) {
  if (sectionId !== 'sec2') return;

  container.innerHTML = `
    <div class="visualizer">
      <div class="viz-title">Elliptic Curve Point Explorer</div>
      <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 16px;">
        y² = x³ + 7 over GF(11). Points on the curve shown as <span style="color: var(--correct); font-weight: 700;">green dots</span>.
        Use the slider to trace scalar multiples kG.
      </p>
      <div class="viz-controls" style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
        <label>k = <span class="viz-output" id="vizKOut">1</span>
          <input type="range" id="vizK" min="0" max="12" value="1">
        </label>
      </div>
      <div id="vizInfo" style="font-size: 0.85rem; color: var(--text-dim); margin: 8px 0;"></div>
      <div id="vizGrid" style="display: flex; justify-content: center; margin-top: 8px;"></div>
      <div id="vizTable" style="margin-top: 12px; font-size: 0.85rem; color: var(--text-dim);"></div>
    </div>
  `;

  // Precompute curve points for y²=x³+7 over GF(11)
  const p = 11;
  const curvePoints = [];
  const squares = new Map(); // val -> list of y
  for (let y = 0; y < p; y++) {
    const sq = (y * y) % p;
    if (!squares.has(sq)) squares.set(sq, []);
    squares.get(sq).push(y);
  }
  for (let x = 0; x < p; x++) {
    const rhs = (((x * x % p) * x % p) + 7) % p;
    if (squares.has(rhs)) {
      for (const y of squares.get(rhs)) {
        curvePoints.push([x, y]);
      }
    }
  }

  // Point addition on y²=x³+7 over GF(11)
  function modinv(a, m) {
    a = ((a % m) + m) % m;
    for (let i = 1; i < m; i++) {
      if ((a * i) % m === 1) return i;
    }
    return null;
  }

  function pointAdd(P, Q) {
    if (P === null) return Q;
    if (Q === null) return P;
    const [x1, y1] = P;
    const [x2, y2] = Q;

    if (x1 === x2 && y1 === (p - y2) % p) return null; // P + (-P) = O

    let lam;
    if (x1 === x2 && y1 === y2) {
      // Doubling: λ = (3x²+a)/(2y), a=0
      const num = (3 * x1 * x1) % p;
      const den = (2 * y1) % p;
      const inv = modinv(den, p);
      if (inv === null) return null;
      lam = (num * inv) % p;
    } else {
      const num = ((y2 - y1) % p + p) % p;
      const den = ((x2 - x1) % p + p) % p;
      const inv = modinv(den, p);
      if (inv === null) return null;
      lam = (num * inv) % p;
    }

    const x3 = ((lam * lam - x1 - x2) % p + p) % p;
    const y3 = ((lam * (x1 - x3) - y1) % p + p) % p;
    return [x3, y3];
  }

  // Precompute scalar multiples
  const G = [7, 3];
  const multiples = [null]; // 0G = O
  let current = null;
  for (let k = 1; k <= 12; k++) {
    current = pointAdd(current, G);
    multiples.push(current);
  }

  function updateViz() {
    const k = parseInt(document.getElementById('vizK').value);
    document.getElementById('vizKOut').textContent = k;

    const kG = multiples[k];
    const infoDiv = document.getElementById('vizInfo');
    if (k === 0) {
      infoDiv.innerHTML = '<strong>0G = O</strong> (point at infinity — identity element)';
    } else if (kG === null) {
      infoDiv.innerHTML = `<strong>${k}G = O</strong> (point at infinity — full cycle!)`;
    } else {
      infoDiv.innerHTML = `<strong>${k}G = (${kG[0]}, ${kG[1]})</strong>`;
    }

    // Collect all visited points up to k
    const visited = new Set();
    for (let i = 1; i <= k; i++) {
      const m = multiples[i];
      if (m !== null) visited.add(`${m[0]},${m[1]}`);
    }

    // Draw grid
    const cellSize = 28;
    const pad = 32;
    const width = p * cellSize + pad * 2;
    const height = p * cellSize + pad * 2;

    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="max-width: 100%;">`;

    // Grid lines
    for (let i = 0; i <= p; i++) {
      const x = pad + i * cellSize;
      const y = pad + i * cellSize;
      svg += `<line x1="${pad}" y1="${y}" x2="${pad + p * cellSize}" y2="${y}" stroke="var(--border)" stroke-width="0.5" opacity="0.3"/>`;
      svg += `<line x1="${x}" y1="${pad}" x2="${x}" y2="${pad + p * cellSize}" stroke="var(--border)" stroke-width="0.5" opacity="0.3"/>`;
    }

    // Axis labels
    for (let i = 0; i < p; i++) {
      const x = pad + i * cellSize + cellSize / 2;
      const y = pad + (p - 1 - i) * cellSize + cellSize / 2;
      svg += `<text x="${x}" y="${pad + p * cellSize + 16}" text-anchor="middle" fill="var(--text-dim)" font-size="10" font-family="'JetBrains Mono', monospace">${i}</text>`;
      svg += `<text x="${pad - 12}" y="${y + 4}" text-anchor="middle" fill="var(--text-dim)" font-size="10" font-family="'JetBrains Mono', monospace">${i}</text>`;
    }
    svg += `<text x="${pad + p * cellSize / 2}" y="${pad + p * cellSize + 28}" text-anchor="middle" fill="var(--text-dim)" font-size="11" font-family="'JetBrains Mono', monospace">x</text>`;
    svg += `<text x="${pad - 24}" y="${pad + p * cellSize / 2}" text-anchor="middle" fill="var(--text-dim)" font-size="11" font-family="'JetBrains Mono', monospace" transform="rotate(-90, ${pad - 24}, ${pad + p * cellSize / 2})">y</text>`;

    // Draw all curve points
    for (const [cx, cy] of curvePoints) {
      const sx = pad + cx * cellSize + cellSize / 2;
      const sy = pad + (p - 1 - cy) * cellSize + cellSize / 2;
      const key = `${cx},${cy}`;
      const isVisited = visited.has(key);
      const isCurrentKG = kG !== null && kG[0] === cx && kG[1] === cy;

      if (isCurrentKG) {
        svg += `<circle cx="${sx}" cy="${sy}" r="11" fill="var(--correct)" stroke="var(--text)" stroke-width="2"/>`;
        svg += `<text x="${sx}" y="${sy + 1}" text-anchor="middle" dominant-baseline="central" fill="var(--bg)" font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">${k}G</text>`;
      } else if (isVisited) {
        svg += `<circle cx="${sx}" cy="${sy}" r="8" fill="var(--correct)" opacity="0.6"/>`;
      } else {
        svg += `<circle cx="${sx}" cy="${sy}" r="6" fill="var(--border)" opacity="0.5"/>`;
      }
    }

    svg += '</svg>';
    document.getElementById('vizGrid').innerHTML = svg;

    // Table of all multiples
    const tableDiv = document.getElementById('vizTable');
    let html = '<strong>Full table:</strong> ';
    const parts = [];
    for (let i = 1; i <= 12; i++) {
      const m = multiples[i];
      const label = m === null ? 'O' : `(${m[0]},${m[1]})`;
      const isCurrent = i === k;
      if (isCurrent) {
        parts.push(`<span style="color: var(--correct); font-weight: 700;">${i}G=${label}</span>`);
      } else if (i <= k) {
        parts.push(`<span style="color: var(--correct);">${i}G=${label}</span>`);
      } else {
        parts.push(`<span>${i}G=${label}</span>`);
      }
    }
    html += parts.join(', ');
    tableDiv.innerHTML = html;
  }

  document.getElementById('vizK').addEventListener('input', updateViz);
  updateViz();
}
