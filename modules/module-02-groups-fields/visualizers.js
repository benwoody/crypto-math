export function mountVisualizers(container, sectionId) {
  if (sectionId !== 'sec2') return;

  container.innerHTML = `
    <div class="visualizer">
      <div class="viz-title">Cyclic Group Explorer</div>
      <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 16px;">
        Points on the circle represent elements of (ℤ/pℤ)*. Arcs trace g<sup>1</sup> → g<sup>2</sup> → ... → 1.
        <span style="color: var(--correct);">Green</span> = visited, <span style="color: var(--text-dim);">gray</span> = unvisited.
      </p>
      <div class="viz-controls" style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
        <label>p =
          <select id="vizPrime" style="background: var(--surface); color: var(--text); border: 1px solid var(--border); padding: 4px 8px; border-radius: 4px; font-family: inherit;">
            <option value="5">5</option>
            <option value="7" selected>7</option>
            <option value="11">11</option>
            <option value="13">13</option>
            <option value="17">17</option>
            <option value="19">19</option>
            <option value="23">23</option>
          </select>
        </label>
        <label>g = <span class="viz-output" id="vizBaseOut">3</span>
          <input type="range" id="vizBase" min="2" max="6" value="3">
        </label>
      </div>
      <div id="vizInfo" style="font-size: 0.85rem; color: var(--text-dim); margin: 8px 0;"></div>
      <div id="vizCanvas" style="display: flex; justify-content: center; margin-top: 8px;"></div>
      <div id="vizSequence" style="margin-top: 12px; font-size: 0.9rem; color: var(--text-dim);"></div>
    </div>
  `;

  function modpow(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % mod;
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return result;
  }

  function updateViz() {
    const p = parseInt(document.getElementById('vizPrime').value);
    const groupOrder = p - 1;

    // Clamp base slider
    const baseSlider = document.getElementById('vizBase');
    baseSlider.max = p - 1;
    let g = parseInt(baseSlider.value);
    if (g >= p) { g = 2; baseSlider.value = 2; }
    document.getElementById('vizBaseOut').textContent = g;

    // Compute powers of g
    const visited = new Set();
    const sequence = [];
    let val = 1;
    for (let k = 1; k <= groupOrder; k++) {
      val = (val * g) % p;
      sequence.push(val);
      visited.add(val);
      if (val === 1) break;
    }

    const order = sequence.length;
    const isGenerator = order === groupOrder;

    // Info line
    const infoDiv = document.getElementById('vizInfo');
    if (isGenerator) {
      infoDiv.innerHTML = `<span style="color: var(--correct); font-weight: 700;">Generator!</span> Order of ${g} = ${order} = group order. All ${groupOrder} elements reached.`;
    } else {
      infoDiv.innerHTML = `<span style="color: var(--hint); font-weight: 700;">Not a generator.</span> Order of ${g} = ${order} (divides ${groupOrder}). Only ${order} of ${groupOrder} elements reached.`;
    }

    // Draw circle diagram
    const size = 320;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 130;

    // Elements are 1..p-1
    const elements = [];
    for (let i = 1; i < p; i++) elements.push(i);

    // Position each element on the circle
    function posOf(elem) {
      const idx = elements.indexOf(elem);
      const angle = -Math.PI / 2 + (2 * Math.PI * idx) / groupOrder;
      return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    }

    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="max-width: 100%;">`;

    // Defs for arrowhead
    svg += `<defs>
      <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,6" fill="var(--correct)" opacity="0.6"/>
      </marker>
    </defs>`;

    // Draw arcs (arrows from g^k to g^(k+1))
    for (let i = 0; i < sequence.length; i++) {
      const from = i === 0 ? 1 : sequence[i - 1];
      // Actually: g^0=1 -> g^1=seq[0] -> g^2=seq[1] -> ...
      const fromElem = i === 0 ? 1 : sequence[i - 1];
      const toElem = sequence[i];
      if (fromElem === toElem) continue; // skip self-loops for order 1

      const pFrom = posOf(fromElem);
      const pTo = posOf(toElem);

      // Curved arc via quadratic bezier through center-ish
      const midX = (pFrom.x + pTo.x) / 2;
      const midY = (pFrom.y + pTo.y) / 2;
      // Pull towards center slightly for curvature
      const pullX = midX + (cx - midX) * 0.3;
      const pullY = midY + (cy - midY) * 0.3;

      // Shorten the arrow to not overlap the node circle
      const dx = pTo.x - pullX;
      const dy = pTo.y - pullY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const shortenTo = 14;
      const endX = pTo.x - (dx / dist) * shortenTo;
      const endY = pTo.y - (dy / dist) * shortenTo;

      svg += `<path d="M${pFrom.x},${pFrom.y} Q${pullX},${pullY} ${endX},${endY}" fill="none" stroke="var(--correct)" stroke-width="1.5" opacity="0.5" marker-end="url(#arrowGreen)"/>`;
    }

    // Draw nodes
    for (const elem of elements) {
      const pos = posOf(elem);
      const isVisited = visited.has(elem);
      const isIdentity = elem === 1;

      const fill = isVisited ? 'var(--correct)' : 'var(--border)';
      const textFill = isVisited ? 'var(--bg)' : 'var(--text-dim)';
      const r = isIdentity ? 14 : 11;
      const strokeW = isIdentity ? 2 : 0;

      svg += `<circle cx="${pos.x}" cy="${pos.y}" r="${r}" fill="${fill}" stroke="${isIdentity ? 'var(--correct)' : 'none'}" stroke-width="${strokeW}" opacity="${isVisited ? 1 : 0.4}"/>`;
      svg += `<text x="${pos.x}" y="${pos.y}" text-anchor="middle" dominant-baseline="central" fill="${textFill}" font-size="${groupOrder > 18 ? 9 : 11}" font-family="'JetBrains Mono', monospace" font-weight="${isVisited ? 700 : 400}">${elem}</text>`;
    }

    svg += '</svg>';
    document.getElementById('vizCanvas').innerHTML = svg;

    // Sequence text
    const seqDiv = document.getElementById('vizSequence');
    const seqLabels = sequence.map((v, i) => `${g}<sup>${i + 1}</sup>=${v}`);
    seqDiv.innerHTML = `<strong>Sequence:</strong> 1 → ${seqLabels.join(' → ')}`;
  }

  document.getElementById('vizPrime').addEventListener('change', updateViz);
  document.getElementById('vizBase').addEventListener('input', updateViz);
  updateViz();
}
