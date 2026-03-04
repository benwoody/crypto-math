function num(v) { return parseFloat(v); }

export default {
  title: 'Module 3: Elliptic Curves',
  sections: [
    // ── SECTION 1: The Curve Equation ──
    {
      id: 'sec1',
      title: '§1 — The Curve Equation',
      shortName: 'Curve',
      puzzles: [
        {
          id: 'p1',
          label: 'Puzzle 1 — Finding Points',
          description: 'Curve: y² = x³ + 7 over GF(11). For each x, compute x³+7 mod 11 and check if the result is a perfect square. Squares mod 11 = {0, 1, 3, 4, 5, 9}.',
          inputs: [
            {
              fields: [
                { id: 'p1a', label: 'x=2: x³+7 mod 11 =', placeholder: '?' },
                { id: 'p1b', label: 'Is it a square mod 11?', placeholder: 'yes or no' },
                { id: 'p1c', label: 'x=5: x³+7 mod 11 =', placeholder: '?' },
                { id: 'p1d', label: 'Is it a square mod 11?', placeholder: 'yes or no' },
                { id: 'p1e', label: 'x=8: x³+7 mod 11 =', placeholder: '?' },
                { id: 'p1f', label: 'Is it a square mod 11?', placeholder: 'yes or no' },
              ],
              validate(vals) {
                // x=2: 8+7=15≡4. Square? Yes (2²=4)
                // x=5: 125+7=132≡0. Square? Yes (0²=0)
                // x=8: 512+7=519≡2. Square? No
                return [
                  { correct: num(vals.p1a) === 4, hint: '4 (8+7=15≡4)' },
                  { correct: vals.p1b === 'yes', hint: 'yes — 2²≡4' },
                  { correct: num(vals.p1c) === 0, hint: '0 (125+7=132≡0)' },
                  { correct: vals.p1d === 'yes', hint: 'yes — 0²≡0' },
                  { correct: num(vals.p1e) === 2, hint: '2 (512+7=519≡2)' },
                  { correct: vals.p1f === 'no', hint: 'no — 2 is not a square mod 11' },
                ];
              },
            },
          ],
          explanation: 'For each x, compute x³+7 mod 11 and check if the result is in {0,1,3,4,5,9} (the quadratic residues mod 11). x=2 gives 4 (a square: y=±2), x=5 gives 0 (a square: y=0), x=8 gives 2 (not a square: no point). Roughly half of x-values yield points — for a 256-bit prime, the curve has approximately p points. This is how Ethereum generates the set of valid public keys.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p2',
          label: 'Puzzle 2 — Symmetry and Negation',
          description: 'Points come in pairs: if (x, y) is on the curve, so is (x, -y mod p). The negation -P = (x, -y mod p).',
          inputs: [
            {
              fields: [
                { id: 'p2a', label: '-(7, 3) = (7, ?)', placeholder: '?' },
                { id: 'p2b', label: '-(6, 5) = (6, ?)', placeholder: '?' },
                { id: 'p2c', label: '-(5, 0) = (5, ?)', placeholder: '?' },
                { id: 'p2d', label: 'What is P + (-P)?', placeholder: '?', width: '120px' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p2a) === 8, hint: '8 (-3≡8 mod 11)' },
                  { correct: num(vals.p2b) === 6, hint: '6 (-5≡6 mod 11)' },
                  { correct: num(vals.p2c) === 0, hint: '0 — (5,0) is its own negation!' },
                  { correct: vals.p2d === 'O' || vals.p2d.includes('infinity') || vals.p2d === 'o' || vals.p2d === '0', hint: 'O (point at infinity)' },
                ];
              },
            },
          ],
          explanation: 'Negation flips the y-coordinate: -(x,y) = (x, p-y). When y=0, the point is its own negation — it\'s an "order 2" element. P + (-P) = O (the point at infinity), which is the identity element of the EC group. This mirrors regular groups: a + (-a) = 0 for addition, a × a⁻¹ = 1 for multiplication. <strong>Every group needs inverses</strong>, and on elliptic curves, negation provides them.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p3',
          label: 'Puzzle 3 — Counting Points',
          description: 'Count all points on y² = x³ + 7 over GF(11).',
          inputs: [
            {
              fields: [
                { id: 'p3a', label: 'Points with x=2:', placeholder: 'e.g. (2,3),(2,8)', width: '180px' },
                { id: 'p3b', label: 'Points with x=5:', placeholder: '?', width: '180px' },
                { id: 'p3c', label: 'Points with x=7:', placeholder: '?', width: '180px' },
                { id: 'p3d', label: 'Total finite points:' },
                { id: 'p3e', label: 'Including point at infinity O:' },
              ],
              validate(vals) {
                const check2 = vals.p3a.includes('2,2') && vals.p3a.includes('2,9');
                const check5 = vals.p3b.includes('5,0');
                const check7 = vals.p3c.includes('7,3') && vals.p3c.includes('7,8');
                return [
                  { correct: check2, hint: '(2,2), (2,9)' },
                  { correct: check5, hint: '(5,0)' },
                  { correct: check7, hint: '(7,3), (7,8)' },
                  { correct: num(vals.p3d) === 11, hint: '11' },
                  { correct: num(vals.p3e) === 12, hint: '12 — group order!' },
                ];
              },
            },
          ],
          explanation: 'The full point list: (2,2), (2,9), (3,1), (3,10), (4,4), (4,7), (5,0), (6,5), (6,6), (7,3), (7,8), plus O. That\'s 12 points — the group order. <strong>Hasse\'s theorem</strong> bounds this: |N-(p+1)| ≤ 2√p. For p=11: N must be between 5 and 19. Our N=12 = p+1 exactly. For secp256k1, the group order is a 256-bit number close to p — approximately 2²⁵⁶ valid public keys.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 2: Point Addition ──
    {
      id: 'sec2',
      title: '§2 — Point Addition',
      shortName: 'Addition',
      puzzles: [
        {
          id: 'p4',
          label: 'Puzzle 4 — Adding Two Distinct Points',
          description: 'Compute P + Q where P=(7,3) and Q=(6,5) on y²=x³+7 over GF(11). Formula: λ = (y₂-y₁)/(x₂-x₁) mod p, then x₃ = λ²-x₁-x₂, y₃ = λ(x₁-x₃)-y₁.',
          inputs: [
            {
              fields: [
                { id: 'p4a', label: 'y₂ - y₁ mod 11 = 5 - 3 =' },
                { id: 'p4b', label: 'x₂ - x₁ mod 11 = 6 - 7 =', placeholder: '?' },
                { id: 'p4c', label: '(x₂-x₁)⁻¹ mod 11 = 10⁻¹ =' },
                { id: 'p4d', label: 'λ = 2 × 10 mod 11 =' },
                { id: 'p4e', label: 'x₃ = λ² - 7 - 6 mod 11 =' },
                { id: 'p4f', label: 'y₃ = λ(7 - x₃) - 3 mod 11 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p4a) === 2, hint: '2' },
                  { correct: num(vals.p4b) === 10, hint: '10 (-1≡10 mod 11)' },
                  { correct: num(vals.p4c) === 10, hint: '10 (10×10=100≡1)' },
                  { correct: num(vals.p4d) === 9, hint: '9 (20 mod 11)' },
                  { correct: num(vals.p4e) === 2, hint: '2 (81-13=68≡2)' },
                  { correct: num(vals.p4f) === 9, hint: '9 (9×5-3=42≡9)' },
                ];
              },
            },
          ],
          explanation: 'Point addition on an elliptic curve: draw a line through P and Q, find the third intersection, reflect over the x-axis. Algebraically: compute the slope λ = (y₂-y₁)/(x₂-x₁) using modular inverse, then x₃ = λ²-x₁-x₂ and y₃ = λ(x₁-x₃)-y₁, all mod p. Result: <strong>(7,3) + (6,5) = (2,9)</strong>. This is the group operation that replaces multiplication in DH/DSA.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p5',
          label: 'Puzzle 5 — Point Doubling',
          description: 'Double G=(7,3) on y²=x³+7 (a=0). Tangent formula: λ = (3x₁²+a)/(2y₁) mod p.',
          inputs: [
            {
              fields: [
                { id: 'p5a', label: '3x₁² + a = 3(49) + 0 mod 11 =' },
                { id: 'p5b', label: '2y₁ = 2(3) mod 11 =' },
                { id: 'p5c', label: '(2y₁)⁻¹ = 6⁻¹ mod 11 =' },
                { id: 'p5d', label: 'λ = 4 × 2 mod 11 =' },
                { id: 'p5e', label: 'x₃ = λ² - 2(7) mod 11 =' },
                { id: 'p5f', label: 'y₃ = λ(7 - x₃) - 3 mod 11 =' },
              ],
              validate(vals) {
                // 3*49=147 mod 11: 147-13*11=147-143=4
                // 2*3=6
                // 6^-1 mod 11: 6*2=12≡1, so 6^-1=2
                // λ = 4*2 = 8
                // x3 = 64-14=50 mod 11=6
                // y3 = 8(7-6)-3 = 8-3 = 5
                return [
                  { correct: num(vals.p5a) === 4, hint: '4 (147 mod 11)' },
                  { correct: num(vals.p5b) === 6, hint: '6' },
                  { correct: num(vals.p5c) === 2, hint: '2 (6×2=12≡1)' },
                  { correct: num(vals.p5d) === 8, hint: '8' },
                  { correct: num(vals.p5e) === 6, hint: '6 (64-14=50≡6)' },
                  { correct: num(vals.p5f) === 5, hint: '5 (8×1-3=5)' },
                ];
              },
            },
          ],
          explanation: 'Point doubling uses the tangent slope: λ = (3x²+a)/(2y). For y²=x³+7, a=0. Result: <strong>2G = 2×(7,3) = (6,5)</strong>. Doubling is key to efficient scalar multiplication — computing kG via double-and-add takes ~log₂(k) operations instead of k additions. For a 256-bit private key, that\'s ~512 operations instead of 2²⁵⁶.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p6',
          label: 'Puzzle 6 — Verify Consistency',
          description: 'Check that the group operation is consistent: 2G + G should equal 3G.',
          inputs: [
            {
              fields: [
                { id: 'p6a', label: '1G =' , placeholder: '(?,?)', width: '100px' },
                { id: 'p6b', label: '2G =' , placeholder: '(?,?)', width: '100px' },
                { id: 'p6c', label: '3G = 2G + G = (6,5) + (7,3) =' , placeholder: '(?,?)', width: '100px' },
                { id: 'p6d', label: '-3G = -(2,9) =' , placeholder: '(?,?)', width: '100px' },
                { id: 'p6e', label: '9G (which equals -3G) =' , placeholder: '(?,?)', width: '100px' },
                { id: 'p6f', label: '3G + 9G =' , placeholder: '?', width: '100px' },
              ],
              validate(vals) {
                const pt = v => v.replace(/\s/g, '');
                return [
                  { correct: pt(vals.p6a).includes('7,3'), hint: '(7,3)' },
                  { correct: pt(vals.p6b).includes('6,5'), hint: '(6,5)' },
                  { correct: pt(vals.p6c).includes('2,9'), hint: '(2,9) — we computed this in P4!' },
                  { correct: pt(vals.p6d).includes('2,2'), hint: '(2,2) — flip y: 11-9=2' },
                  { correct: pt(vals.p6e).includes('2,2'), hint: '(2,2)' },
                  { correct: vals.p6f === 'O' || vals.p6f.includes('infinity') || vals.p6f === 'o' || vals.p6f === '0', hint: 'O — they\'re inverses!' },
                ];
              },
            },
          ],
          explanation: '3G = (2,9) and 9G = (2,2). Since -(2,9) = (2,2), we have 9G = -3G, so 3G + 9G = O. This confirms 12G = O (the group order is 12). Every equation from Module 2 carries over: <strong>kG + (n-k)G = nG = O</strong>, just like a^k × a^(n-k) = a^n = 1 in multiplicative groups. Same group theory, different operation.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 3: Scalar Multiplication ──
    {
      id: 'sec3',
      title: '§3 — Scalar Multiplication',
      shortName: 'Scalar Mult',
      puzzles: [
        {
          id: 'p7',
          label: 'Puzzle 7 — Scalar Multiplication Table',
          description: 'Fill in kG for the curve y²=x³+7 over GF(11), G=(7,3). Group order = 12.',
          inputs: [
            {
              fields: [
                { id: 'p7a', label: '1G =', placeholder: '(?,?)', width: '100px' },
                { id: 'p7b', label: '2G =', placeholder: '(?,?)', width: '100px' },
                { id: 'p7c', label: '3G =', placeholder: '(?,?)', width: '100px' },
                { id: 'p7d', label: '6G =', placeholder: '(?,?)', width: '100px' },
                { id: 'p7e', label: '11G =', placeholder: '(?,?)', width: '100px' },
                { id: 'p7f', label: '12G =', placeholder: '?', width: '100px' },
              ],
              validate(vals) {
                const pt = v => v.replace(/\s/g, '');
                return [
                  { correct: pt(vals.p7a).includes('7,3'), hint: '(7,3)' },
                  { correct: pt(vals.p7b).includes('6,5'), hint: '(6,5)' },
                  { correct: pt(vals.p7c).includes('2,9'), hint: '(2,9)' },
                  { correct: pt(vals.p7d).includes('5,0'), hint: '(5,0)' },
                  { correct: pt(vals.p7e).includes('7,8'), hint: '(7,8) = -G' },
                  { correct: vals.p7f === 'O' || vals.p7f.includes('infinity') || vals.p7f === 'o' || vals.p7f === '0', hint: 'O — full cycle!' },
                ];
              },
            },
          ],
          explanation: 'The full cycle: 1G=(7,3), 2G=(6,5), 3G=(2,9), 4G=(3,1), 5G=(4,4), 6G=(5,0), 7G=(4,7), 8G=(3,10), 9G=(2,2), 10G=(6,6), 11G=(7,8), 12G=O. All 12 points appear — G generates the entire group, just like 3 generated all of (ℤ/7ℤ)*. In secp256k1, the generator G cycles through ~2²⁵⁶ points before returning to O.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p8',
          label: 'Puzzle 8 — Double-and-Add Algorithm',
          description: 'Compute 9G efficiently. 9 in binary = 1001₂.',
          inputs: [
            {
              fields: [
                { id: 'p8a', label: '9 in binary =', placeholder: 'e.g. 1001', width: '120px' },
                { id: 'p8b', label: 'Start: acc = G = (7,3). Double: 2G =', placeholder: '(?,?)', width: '100px' },
                { id: 'p8c', label: 'Bit=0, double only: 4G =', placeholder: '(?,?)', width: '100px' },
                { id: 'p8d', label: 'Bit=0, double only: 8G =', placeholder: '(?,?)', width: '100px' },
                { id: 'p8e', label: 'Bit=1, double+add: 8G+G = 9G =', placeholder: '(?,?)', width: '100px' },
              ],
              validate(vals) {
                const pt = v => v.replace(/\s/g, '');
                return [
                  { correct: vals.p8a.replace(/\s/g, '') === '1001', hint: '1001' },
                  { correct: pt(vals.p8b).includes('6,5'), hint: '(6,5)' },
                  { correct: pt(vals.p8c).includes('3,1'), hint: '(3,1)' },
                  { correct: pt(vals.p8d).includes('3,10'), hint: '(3,10)' },
                  { correct: pt(vals.p8e).includes('2,2'), hint: '(2,2) ✓' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Efficiency',
              fields: [
                { id: 'p8f', label: 'Operations used (doublings + additions):', placeholder: '?' },
                { id: 'p8g', label: 'Naive method (8 additions):', placeholder: '?' },
                { id: 'p8h', label: 'For a 256-bit key, double-and-add needs ~? ops:', placeholder: '?' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p8f) === 4, hint: '4 (3 doublings + 1 add)' },
                  { correct: num(vals.p8g) === 8, hint: '8' },
                  { correct: num(vals.p8h) === 512 || vals.p8h === '~512' || vals.p8h === '512', hint: '~512 vs 2²⁵⁶ — tractable!' },
                ];
              },
            },
          ],
          explanation: 'Double-and-add processes the binary representation: for each bit, double; if the bit is 1, also add G. 9 = 1001₂ → double, double, double, add = 4 operations vs 8 naive. For a 256-bit key: ~256 doublings + ~128 additions ≈ 512 operations vs 2²⁵⁶. <strong>This is why ECDSA signing takes milliseconds</strong>, not billions of years. Every Ethereum transaction uses this algorithm.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p9',
          label: 'Puzzle 9 — Order and Wraparound',
          description: 'The group order n=12 means 12G=O. Everything wraps around, just like modular arithmetic.',
          inputs: [
            {
              fields: [
                { id: 'p9a', label: '12G =', placeholder: '?', width: '100px' },
                { id: 'p9b', label: '13G =', placeholder: '(?,?)', width: '100px' },
                { id: 'p9c', label: '100G: 100 mod 12 =', placeholder: '?' },
                { id: 'p9d', label: '100G =', placeholder: '(?,?)', width: '100px' },
                { id: 'p9e', label: 'Valid private key range: [1, ?]', placeholder: '?' },
              ],
              validate(vals) {
                const pt = v => v.replace(/\s/g, '');
                return [
                  { correct: vals.p9a === 'O' || vals.p9a.includes('infinity') || vals.p9a === 'o' || vals.p9a === '0', hint: 'O' },
                  { correct: pt(vals.p9b).includes('7,3'), hint: '(7,3) = G (wraps!)' },
                  { correct: num(vals.p9c) === 4, hint: '4' },
                  { correct: pt(vals.p9d).includes('3,1'), hint: '(3,1) = 4G' },
                  { correct: num(vals.p9e) === 11, hint: '11 (n-1)' },
                ];
              },
            },
          ],
          explanation: 'Just like a^(p-1) ≡ 1 in (ℤ/pℤ)*, we have nG = O on elliptic curves. Scalar multiplication wraps: 13G = G, 100G = 4G. <strong>Private keys live in [1, n-1]</strong>: 0 gives O (useless), and n gives O too (same problem). For secp256k1, n ≈ 2²⁵⁶ — so there are roughly 2²⁵⁶ valid private keys. Picking one at random is your Ethereum private key.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 4: The EC Discrete Log Problem ──
    {
      id: 'sec4',
      title: '§4 — The EC Discrete Log Problem',
      shortName: 'ECDLP',
      puzzles: [
        {
          id: 'p10',
          label: 'Puzzle 10 — Forward Easy, Backward Hard',
          description: 'On y²=x³+7 over GF(11), G=(7,3). Forward: compute kG. Backward: given Q, find k.',
          inputs: [
            {
              fields: [
                { id: 'p10a', label: 'Compute 5G (use table or add):', placeholder: '(?,?)', width: '100px' },
                { id: 'p10b', label: 'Easy or hard?', placeholder: 'easy or hard' },
                { id: 'p10c', label: 'Given Q = (3,10), find k where kG = Q:', placeholder: '?' },
                { id: 'p10d', label: 'How did you find it?', placeholder: 'method', width: '200px' },
              ],
              validate(vals) {
                const pt = v => v.replace(/\s/g, '');
                return [
                  { correct: pt(vals.p10a).includes('4,4'), hint: '(4,4)' },
                  { correct: vals.p10b === 'easy', hint: 'easy — just compute' },
                  { correct: num(vals.p10c) === 8, hint: '8 (8G = (3,10))' },
                  { correct: vals.p10d.includes('search') || vals.p10d.includes('trial') || vals.p10d.includes('table') || vals.p10d.includes('brute') || vals.p10d.includes('check'), hint: 'had to search through the table' },
                ];
              },
            },
          ],
          explanation: 'Computing 5G is straightforward: double-and-add gives (4,4) in a few steps. But finding k from Q = (3,10)? You had to search: try 1G, 2G, 3G... until you hit (3,10) at k=8. With 12 points, brute force is trivial. With 2²⁵⁶ points? <strong>No known algorithm can do it efficiently.</strong> This asymmetry — forward easy, backward hard — is the <strong>Elliptic Curve Discrete Log Problem (ECDLP)</strong>, the foundation of ECDSA and all EC-based cryptography.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p11',
          label: 'Puzzle 11 — Key Sizes Compared',
          description: 'The best attack on ECDLP is Pollard\'s rho: O(√n) steps. Compare to modular DLP.',
          inputs: [
            {
              fields: [
                { id: 'p11a', label: 'ECDLP best attack: O(√n). For 256-bit curve: 2^? steps', placeholder: '?' },
                { id: 'p11b', label: 'Security level of 256-bit EC key:', placeholder: '?-bit' },
                { id: 'p11c', label: 'RSA/DH key for same 128-bit security:', placeholder: '?-bit' },
                { id: 'p11d', label: 'Factor smaller (3072/256):', placeholder: '?' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p11a) === 128, hint: '128 (√2²⁵⁶ = 2¹²⁸)' },
                  { correct: num(vals.p11b) === 128 || vals.p11b.includes('128'), hint: '128-bit' },
                  { correct: num(vals.p11c) === 3072 || vals.p11c.includes('3072'), hint: '3072-bit' },
                  { correct: num(vals.p11d) === 12, hint: '12× — dramatic difference!' },
                ];
              },
            },
          ],
          explanation: 'ECDLP is <strong>fully exponential</strong>: the best attack (Pollard\'s rho) takes O(√n) = O(2¹²⁸) steps for a 256-bit curve. Modular DLP is <strong>sub-exponential</strong>: the number field sieve beats brute force for large primes, requiring 3072-bit keys for 128-bit security. This 12× key size advantage is why Ethereum, Bitcoin, TLS 1.3, and Signal all use elliptic curves over RSA/DH for signatures and key exchange.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p12',
          label: 'Puzzle 12 — secp256k1 Parameters',
          description: 'The actual curve used by Ethereum and Bitcoin.',
          inputs: [
            {
              fields: [
                { id: 'p12a', label: 'Curve equation: y² = x³ + ?x + ?', placeholder: 'a, b', width: '120px' },
                { id: 'p12b', label: 'Field prime p = 2²⁵⁶ - 2³² - ?', placeholder: '?' },
                { id: 'p12c', label: 'Is the group order n prime?', placeholder: 'yes or no' },
                { id: 'p12d', label: 'Why prime order matters:', placeholder: 'hint: subgroups', width: '200px' },
              ],
              validate(vals) {
                const ab = vals.p12a.replace(/\s/g, '');
                return [
                  { correct: ab.includes('0') && ab.includes('7'), hint: 'a=0, b=7 — same equation we\'ve been using!' },
                  { correct: num(vals.p12b) === 977, hint: '977' },
                  { correct: vals.p12c === 'yes', hint: 'yes' },
                  { correct: vals.p12d.includes('no small') || vals.p12d.includes('none') || vals.p12d.includes('no sub') || vals.p12d.includes('only'), hint: 'no small subgroups — every element (except O) generates the full group' },
                ];
              },
            },
          ],
          explanation: 'secp256k1: y² = x³ + 7 over GF(p), p = 2²⁵⁶ - 2³² - 977. The "7" is the same b we\'ve been using! The group order n is prime, which means <strong>there are no proper subgroups</strong> (by Lagrange, the only divisors of a prime are 1 and itself). Every point except O is a generator. No subgroup attacks are possible. This is why secp256k1 was chosen: clean equation, prime order, efficient arithmetic.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 5: ECDSA and Ethereum ──
    {
      id: 'sec5',
      title: '§5 — ECDSA and Ethereum',
      shortName: 'ECDSA',
      puzzles: [
        {
          id: 'p13',
          label: 'Puzzle 13 — ECDSA Signing',
          description: 'Curve: y²=x³+x+6 over GF(7), n=11, G=(1,1). Sign hash z=5 with private key d=3, nonce k=7.',
          inputs: [
            {
              fields: [
                { id: 'p13a', label: 'R = kG = 7G =', placeholder: '(?,?)', width: '100px' },
                { id: 'p13b', label: 'r = R.x =' },
                { id: 'p13c', label: 'k⁻¹ mod n = 7⁻¹ mod 11 =' },
                { id: 'p13d', label: 'z + r×d mod 11 = 5 + 4×3 =' },
                { id: 'p13e', label: 's = k⁻¹(z + rd) mod 11 =' },
                { id: 'p13f', label: 'Signature (r, s) =', placeholder: '(?,?)', width: '100px' },
              ],
              validate(vals) {
                const pt = v => v.replace(/\s/g, '');
                return [
                  { correct: pt(vals.p13a).includes('4,2'), hint: '(4,2)' },
                  { correct: num(vals.p13b) === 4, hint: '4' },
                  { correct: num(vals.p13c) === 8, hint: '8 (7×8=56≡1 mod 11)' },
                  { correct: num(vals.p13d) === 6, hint: '6 (17 mod 11)' },
                  { correct: num(vals.p13e) === 4, hint: '4 (8×6=48≡4 mod 11)' },
                  { correct: pt(vals.p13f).includes('4,4'), hint: '(4, 4)' },
                ];
              },
            },
          ],
          explanation: 'ECDSA signing: pick random nonce k, compute R = kG, set r = R.x, compute s = k⁻¹(z + rd) mod n. The signature is (r, s) = (4, 4). The nonce k <strong>must be truly random and never reused</strong> — if k is known or repeated, the private key d can be computed directly: d = (sk - z)/r mod n. The PlayStation 3 hack and several Bitcoin thefts exploited nonce reuse.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p14',
          label: 'Puzzle 14 — ECDSA Verification',
          description: 'Verify signature (r,s)=(4,4) on hash z=5, using public key Q = dG = 3G = (6,5).',
          inputs: [
            {
              fields: [
                { id: 'p14a', label: 'w = s⁻¹ mod 11 = 4⁻¹ mod 11 =' },
                { id: 'p14b', label: 'u₁ = z×w mod 11 = 5×3 =' },
                { id: 'p14c', label: 'u₂ = r×w mod 11 = 4×3 =' },
                { id: 'p14d', label: 'u₁G = 4G =', placeholder: '(?,?)', width: '100px' },
                { id: 'p14e', label: 'u₂Q = 1×Q = Q =', placeholder: '(?,?)', width: '100px' },
                { id: 'p14f', label: 'u₁G + u₂Q = check x-coord = r?', placeholder: 'yes or no' },
              ],
              validate(vals) {
                const pt = v => v.replace(/\s/g, '');
                return [
                  { correct: num(vals.p14a) === 3, hint: '3 (4×3=12≡1)' },
                  { correct: num(vals.p14b) === 4, hint: '4 (15 mod 11)' },
                  { correct: num(vals.p14c) === 1, hint: '1 (12 mod 11)' },
                  { correct: pt(vals.p14d).includes('4,5'), hint: '(4,5)' },
                  { correct: pt(vals.p14e).includes('6,5'), hint: '(6,5)' },
                  { correct: vals.p14f === 'yes', hint: 'yes — x-coord of result = 4 = r ✓' },
                ];
              },
            },
          ],
          explanation: 'Verification: compute w = s⁻¹, u₁ = zw, u₂ = rw, then check that the x-coordinate of u₁G + u₂Q equals r. We get (4,5) + (6,5) = (4,2), and x-coord = 4 = r. ✓ The signature is valid! <strong>Only someone who knows d could produce s</strong>, but anyone with Q = dG can verify. This is how every Ethereum transaction is authenticated — ecrecover computes Q from (v, r, s, z) and checks it matches the sender.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p15',
          label: 'Puzzle 15 — Private Key to Ethereum Address',
          description: 'The full flow from private key to Ethereum address.',
          inputs: [
            {
              fields: [
                { id: 'p15a', label: 'Step 1: Generate random private key k ∈ [1, n-1]. How many bits?', placeholder: '?' },
                { id: 'p15b', label: 'Step 2: Compute public key Q = kG. What operation?', placeholder: '?', width: '200px' },
                { id: 'p15c', label: 'Step 3: Hash Q with keccak256. Output size?', placeholder: '? bytes', width: '120px' },
                { id: 'p15d', label: 'Step 4: Take last ? bytes for address:', placeholder: '?' },
                { id: 'p15e', label: 'Ethereum address length in hex chars:', placeholder: '?' },
                { id: 'p15f', label: 'What does ecrecover return?', placeholder: '?', width: '200px' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p15a) === 256, hint: '256' },
                  { correct: vals.p15b.includes('scalar') || vals.p15b.includes('mult') || vals.p15b.includes('point') || vals.p15b.includes('double'), hint: 'EC scalar multiplication' },
                  { correct: num(vals.p15c) === 32 || vals.p15c.includes('32'), hint: '32 bytes (256 bits)' },
                  { correct: num(vals.p15d) === 20, hint: '20 bytes (160 bits)' },
                  { correct: num(vals.p15e) === 40, hint: '40 (20 bytes × 2 hex chars)' },
                  { correct: vals.p15f.includes('public') || vals.p15f.includes('address') || vals.p15f.includes('key') || vals.p15f.includes('signer'), hint: 'the public key (→ address) of the signer' },
                ];
              },
            },
          ],
          explanation: 'The Ethereum key flow: <strong>private key</strong> (256 random bits) → <strong>public key</strong> (EC scalar multiplication, kG on secp256k1) → <strong>keccak256 hash</strong> (32 bytes) → <strong>last 20 bytes</strong> = address (40 hex chars, prefixed with 0x). Transaction signing uses ECDSA to produce (v, r, s). The <code>ecrecover</code> precompile recovers the public key from the signature, derives the address, and checks it matches msg.sender. Every ETH transfer, every smart contract call, every DeFi trade relies on this exact math.',
          explanationType: 'correct-exp',
        },
      ],
    },
  ],
};
