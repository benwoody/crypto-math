function num(v) { return parseFloat(v); }

export default {
  title: 'Module 1: Modular Arithmetic',
  sections: [
    // ── SECTION 1: GCD and the Euclidean Algorithm ──
    {
      id: 'sec1',
      title: '§1 — GCD and the Euclidean Algorithm',
      shortName: 'GCD',
      puzzles: [
        {
          id: 'p1',
          label: 'Puzzle 1 — GCD by Hand',
          description: 'Find the greatest common divisor of each pair.',
          inputs: [
            {
              fields: [
                { id: 'p1a', label: 'GCD(48, 18) =' },
                { id: 'p1b', label: 'GCD(17, 5) =' },
                { id: 'p1c', label: 'GCD(100, 35) =' },
                { id: 'p1d', label: 'GCD(13, 13) =' },
                { id: 'p1e', label: 'GCD(7, 1) =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p1a) === 6, hint: '6' },
                  { correct: num(vals.p1b) === 1, hint: '1' },
                  { correct: num(vals.p1c) === 5, hint: '5' },
                  { correct: num(vals.p1d) === 13, hint: '13' },
                  { correct: num(vals.p1e) === 1, hint: '1' },
                ];
              },
            },
          ],
          explanation: '<strong>GCD</strong> is the largest number that divides both inputs. <code>GCD(48,18) = 6</code> because 48 = 6×8 and 18 = 6×3. When GCD = 1, the numbers are <em>coprime</em> — they share no common factors. This is the key property for modular inverses: a number has an inverse mod n <em>only if</em> it\'s coprime to n. Every RSA key, every Diffie-Hellman exchange, every digital signature depends on this.',
          explanationType: 'hint-exp',
        },
        {
          id: 'p2',
          label: 'Puzzle 2 — Coprime Pairs',
          description: 'Are these pairs coprime? (yes/no)',
          inputs: [
            {
              fields: [
                { id: 'p2a', label: '(15, 28):', placeholder: 'yes or no' },
                { id: 'p2b', label: '(12, 9):', placeholder: 'yes or no' },
                { id: 'p2c', label: '(35, 6):', placeholder: 'yes or no' },
                { id: 'p2d', label: '(256, 7):', placeholder: 'yes or no' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p2a === 'yes', hint: 'yes — GCD=1' },
                  { correct: vals.p2b === 'no', hint: 'no — GCD=3' },
                  { correct: vals.p2c === 'yes', hint: 'yes — GCD=1' },
                  { correct: vals.p2d === 'yes', hint: 'yes — GCD=1' },
                ];
              },
            },
          ],
          explanation: 'Two numbers are <em>coprime</em> if their GCD is 1. (12,9) share the factor 3, so they\'re not coprime. In RSA, when you pick public exponent <code>e</code>, it must be coprime to <code>φ(n)</code> — otherwise decryption is impossible. In Diffie-Hellman, the generator and the prime modulus must be coprime. Coprimality is the gatekeeper of all public-key cryptography.',
          explanationType: 'hint-exp',
        },
        {
          id: 'p3',
          label: 'Puzzle 3 — The Euclidean Algorithm',
          description: 'Step through the algorithm: repeatedly divide and take remainders until you hit 0.',
          inputs: [
            {
              fields: [
                { id: 'p3a', label: '252 = 105 × ? + ?', type: 'dual', label2: 'R:', placeholder1: 'Q', placeholder2: 'R' },
                { id: 'p3b', label: '105 = 42 × ? + ?', type: 'dual', label2: 'R:', placeholder1: 'Q', placeholder2: 'R' },
                { id: 'p3c', label: '42 = 21 × ? + ?', type: 'dual', label2: 'R:', placeholder1: 'Q', placeholder2: 'R' },
                { id: 'p3d', label: 'GCD(252, 105) =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p3a_q) === 2 && num(vals.p3a_r) === 42, hint: '2, R: 42' },
                  { correct: num(vals.p3b_q) === 2 && num(vals.p3b_r) === 21, hint: '2, R: 21' },
                  { correct: num(vals.p3c_q) === 2 && num(vals.p3c_r) === 0, hint: '2, R: 0' },
                  { correct: num(vals.p3d) === 21, hint: '21' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: GCD(161, 28)',
              fields: [
                { id: 'p3e', label: '161 = 28 × ? + ?', type: 'dual', label2: 'R:', placeholder1: 'Q', placeholder2: 'R' },
                { id: 'p3f', label: '28 = 21 × ? + ?', type: 'dual', label2: 'R:', placeholder1: 'Q', placeholder2: 'R' },
                { id: 'p3g', label: '21 = 7 × ? + ?', type: 'dual', label2: 'R:', placeholder1: 'Q', placeholder2: 'R' },
                { id: 'p3h', label: 'GCD(161, 28) =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p3e_q) === 5 && num(vals.p3e_r) === 21, hint: '5, R: 21' },
                  { correct: num(vals.p3f_q) === 1 && num(vals.p3f_r) === 7, hint: '1, R: 7' },
                  { correct: num(vals.p3g_q) === 3 && num(vals.p3g_r) === 0, hint: '3, R: 0' },
                  { correct: num(vals.p3h) === 7, hint: '7' },
                ];
              },
            },
          ],
          explanation: 'The Euclidean Algorithm: divide the larger by the smaller, take the remainder, repeat. When remainder = 0, the last nonzero remainder is the GCD. This 2300-year-old algorithm runs inside every RSA key generation, every TLS handshake, every PGP signature. It\'s how your browser computes modular inverses to establish a secure connection. Fast, elegant, and fundamental.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 2: Modular Inverses ──
    {
      id: 'sec2',
      title: '§2 — Modular Inverses',
      shortName: 'Inverses',
      puzzles: [
        {
          id: 'p4',
          label: 'Puzzle 4 — Finding Inverses by Trial',
          description: 'Find the number x such that a × x ≡ 1 (mod m). Try all values.',
          inputs: [
            {
              fields: [
                { id: 'p4a', label: '3⁻¹ mod 7 =', placeholder: '?' },
                { id: 'p4b', label: '5⁻¹ mod 11 =', placeholder: '?' },
                { id: 'p4c', label: '2⁻¹ mod 13 =', placeholder: '?' },
                { id: 'p4d', label: '6⁻¹ mod 10 =', placeholder: 'number or "none"' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p4a) === 5, hint: '5 (3×5=15≡1)' },
                  { correct: num(vals.p4b) === 9, hint: '9 (5×9=45≡1)' },
                  { correct: num(vals.p4c) === 7, hint: '7 (2×7=14≡1)' },
                  { correct: vals.p4d === 'none' || vals.p4d.includes('none') || vals.p4d.includes('no') || vals.p4d.includes('doesn\'t exist'), hint: 'none — GCD(6,10)=2' },
                ];
              },
            },
          ],
          explanation: '6 has no inverse mod 10 because GCD(6,10) = 2 ≠ 1. No matter what you multiply 6 by, you\'ll always get an even result — you can never reach 1 (which is odd). <br><br>The rule: <strong>a has a modular inverse mod m if and only if GCD(a,m) = 1</strong>. The first three all have inverses because they\'re coprime to their modulus. In RSA, the public exponent e must be coprime to φ(n), or decryption would be impossible.',
          explanationType: 'hint-exp',
        },
        {
          id: 'p5',
          label: 'Puzzle 5 — When Inverses Exist',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p5a', label: 'Mod 12: which of 1-11 have inverses?', placeholder: 'e.g. 1,5,7,...', width: '200px' },
                { id: 'p5b', label: 'What do those numbers share?', placeholder: 'coprime to...', width: '200px' },
                { id: 'p5c', label: 'Mod 13: how many of 1-12 have inverses?', placeholder: '?' },
              ],
              validate(vals) {
                // Inverses mod 12: numbers coprime to 12 → 1,5,7,11
                const a = vals.p5a.replace(/\s/g, '');
                const hasAll = ['1','5','7','11'].every(n => a.includes(n));
                const noExtras = !['2','3','4','6','8','9','10'].some(n => {
                  const re = new RegExp('(^|,)' + n + '(,|$)');
                  return re.test(a);
                });
                return [
                  { correct: hasAll && noExtras, hint: '1, 5, 7, 11' },
                  { correct: vals.p5b.includes('coprime') || vals.p5b.includes('gcd') || (vals.p5b.includes('common') && vals.p5b.includes('factor')), hint: 'coprime to 12' },
                  { correct: num(vals.p5c) === 12, hint: '12 — all of them!' },
                ];
              },
            },
          ],
          explanation: 'Mod 12: only 1, 5, 7, 11 have inverses — exactly the numbers coprime to 12 (4 out of 11). Mod 13 (prime): <em>every</em> number 1-12 has an inverse — all 12 of them. This is why primes are special: <strong>mod a prime, every nonzero element has an inverse</strong>. This property makes primes the foundation of cryptographic fields. RSA picks two primes. Diffie-Hellman works mod a prime. Elliptic curves operate over prime fields.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p6',
          label: 'Puzzle 6 — Using Inverses to Solve Equations',
          description: 'Use inverses to solve modular equations. If a × a⁻¹ ≡ 1 (mod m), then ax ≡ b becomes x ≡ a⁻¹ × b.',
          inputs: [
            {
              fields: [
                { id: 'p6a', label: '3⁻¹ mod 7 =', placeholder: '?' },
                { id: 'p6b', label: '3x ≡ 5 (mod 7) → x =', placeholder: '?' },
                { id: 'p6c', label: '5⁻¹ mod 11 =', placeholder: '?' },
                { id: 'p6d', label: '5x ≡ 3 (mod 11) → x =', placeholder: '?' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p6a) === 5, hint: '5' },
                  { correct: num(vals.p6b) === 4, hint: '4 (5×5=25≡4 mod 7)' },
                  { correct: num(vals.p6c) === 9, hint: '9' },
                  { correct: num(vals.p6d) === 5, hint: '5 (9×3=27≡5 mod 11)' },
                ];
              },
            },
          ],
          explanation: 'To solve <code>3x ≡ 5 (mod 7)</code>: find <code>3⁻¹ = 5</code>, then <code>x = 5 × 5 = 25 ≡ 4 (mod 7)</code>. Verify: <code>3 × 4 = 12 ≡ 5 (mod 7)</code>. ✓ <br><br><strong>RSA decryption is exactly this.</strong> Encryption computes <code>m^e mod n</code>. Decryption finds the inverse exponent <code>d</code> such that <code>(m^e)^d ≡ m (mod n)</code>. "Multiply by the inverse" is the entire mechanism of public-key decryption.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 3: Fermat, Euler, and Totients ──
    {
      id: 'sec3',
      title: '§3 — Fermat, Euler, and Totients',
      shortName: 'Totients',
      puzzles: [
        {
          id: 'p7',
          label: 'Puzzle 7 — Euler\'s Totient φ(n)',
          description: 'φ(n) counts how many numbers from 1 to n are coprime to n.',
          inputs: [
            {
              fields: [
                { id: 'p7a', label: 'φ(7) =' },
                { id: 'p7b', label: 'φ(10) =' },
                { id: 'p7c', label: 'φ(12) =' },
                { id: 'p7d', label: 'φ(15) =' },
                { id: 'p7e', label: 'φ(13) =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p7a) === 6, hint: '6' },
                  { correct: num(vals.p7b) === 4, hint: '4 (1,3,7,9)' },
                  { correct: num(vals.p7c) === 4, hint: '4 (1,5,7,11)' },
                  { correct: num(vals.p7d) === 8, hint: '8' },
                  { correct: num(vals.p7e) === 12, hint: '12' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Spot the pattern',
              fields: [
                { id: 'p7f', label: 'φ(p) when p is prime =', placeholder: 'formula', width: '160px' },
                { id: 'p7g', label: 'φ(p×q) for primes p,q =', placeholder: 'formula', width: '160px' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p7f.includes('p-1') || vals.p7f.includes('p - 1'), hint: 'p - 1' },
                  { correct: (vals.p7g.includes('p-1') && vals.p7g.includes('q-1')) || (vals.p7g.includes('(p-1)(q-1)') || vals.p7g.includes('(p - 1)(q - 1)') || vals.p7g.includes('(p-1)*(q-1)')), hint: '(p-1)(q-1)' },
                ];
              },
            },
          ],
          explanation: 'For a prime p, every number from 1 to p-1 is coprime to p, so <code>φ(p) = p - 1</code>. For two distinct primes p and q: <code>φ(p×q) = (p-1)(q-1)</code>. This is the formula RSA uses. When you generate an RSA key with primes p and q, you compute <code>n = p×q</code> and <code>φ(n) = (p-1)(q-1)</code>. The private key is computed from φ(n). If an attacker could factor n into p and q, they could compute φ(n) and break the key. RSA\'s security rests on factoring being hard.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p8',
          label: 'Puzzle 8 — Fermat\'s Little Theorem',
          description: 'If p is prime and a is not divisible by p, then a^(p-1) ≡ 1 (mod p).',
          inputs: [
            {
              fields: [
                { id: 'p8a', label: '2^6 mod 7 =' },
                { id: 'p8b', label: '3^6 mod 7 =' },
                { id: 'p8c', label: '5^10 mod 11 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p8a) === 1, hint: '1' },
                  { correct: num(vals.p8b) === 1, hint: '1' },
                  { correct: num(vals.p8c) === 1, hint: '1' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Use the theorem to compute huge powers',
              fields: [
                { id: 'p8d', label: '3^100 mod 7: 100 mod 6 =', placeholder: '?' },
                { id: 'p8e', label: 'So 3^100 ≡ 3^? (mod 7)', placeholder: '?' },
                { id: 'p8f', label: '3^100 mod 7 =', placeholder: '?' },
                { id: 'p8g', label: '2^1000 mod 11: 1000 mod 10 =', placeholder: '?' },
                { id: 'p8h', label: '2^1000 mod 11 =', placeholder: '?' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p8d) === 4, hint: '4' },
                  { correct: num(vals.p8e) === 4, hint: '4' },
                  { correct: num(vals.p8f) === 4, hint: '4 (3^4=81≡4)' },
                  { correct: num(vals.p8g) === 0, hint: '0' },
                  { correct: num(vals.p8h) === 1, hint: '1 (2^0≡1)' },
                ];
              },
            },
          ],
          explanation: 'Fermat\'s Little Theorem: <code>a^(p-1) ≡ 1 (mod p)</code>. To compute <code>3^100 mod 7</code>: since <code>3^6 ≡ 1 (mod 7)</code>, we reduce the exponent: <code>100 mod 6 = 4</code>, so <code>3^100 ≡ 3^4 = 81 ≡ 4 (mod 7)</code>. For <code>2^1000 mod 11</code>: <code>1000 mod 10 = 0</code>, so <code>2^1000 ≡ 2^0 = 1 (mod 11)</code>. <br><br>This is how PGP/RSA handle 2048-bit exponents without computing the actual number. The exponent cycles, so you only need to know where you are in the cycle.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p9',
          label: 'Puzzle 9 — Euler\'s Theorem',
          description: 'The generalization: a^φ(n) ≡ 1 (mod n) when GCD(a,n) = 1. Works for any n, not just primes.',
          inputs: [
            {
              fields: [
                { id: 'p9a', label: 'φ(10) =' },
                { id: 'p9b', label: '3^φ(10) mod 10 = 3^? mod 10', placeholder: '?' },
                { id: 'p9c', label: '3^4 mod 10 =' },
                { id: 'p9d', label: '7^φ(10) mod 10 = 7^4 mod 10 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p9a) === 4, hint: '4' },
                  { correct: num(vals.p9b) === 4, hint: '4' },
                  { correct: num(vals.p9c) === 1, hint: '1 (81 mod 10 = 1)' },
                  { correct: num(vals.p9d) === 1, hint: '1 (2401 mod 10 = 1)' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: RSA connection',
              fields: [
                { id: 'p9e', label: 'In RSA, n = p×q. φ(n) =', placeholder: 'formula', width: '160px' },
                { id: 'p9f', label: 'RSA picks d so e×d ≡ 1 mod', placeholder: '?', width: '160px' },
              ],
              validate(vals) {
                return [
                  { correct: (vals.p9e.includes('p-1') && vals.p9e.includes('q-1')) || vals.p9e.includes('(p-1)(q-1)') || vals.p9e.includes('(p - 1)(q - 1)'), hint: '(p-1)(q-1)' },
                  { correct: vals.p9f.includes('φ') || vals.p9f.includes('phi') || vals.p9f.includes('(p-1)(q-1)') || vals.p9f.includes('totient'), hint: 'φ(n)' },
                ];
              },
            },
          ],
          explanation: 'Euler\'s Theorem generalizes Fermat to composite moduli: <code>a^φ(n) ≡ 1 (mod n)</code>. RSA uses this directly: pick primes p, q, compute <code>n = pq</code>, <code>φ(n) = (p-1)(q-1)</code>. Choose public exponent e coprime to φ(n), find private key <code>d = e⁻¹ mod φ(n)</code>. Then <code>(m^e)^d = m^(ed) = m^(1 + kφ(n)) = m × (m^φ(n))^k ≡ m × 1^k = m (mod n)</code>. Euler\'s theorem is why RSA decryption recovers the original message.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 4: Prime Fields ──
    {
      id: 'sec4',
      title: '§4 — Prime Fields',
      shortName: 'Prime Fields',
      puzzles: [
        {
          id: 'p10',
          label: 'Puzzle 10 — Arithmetic in ℤ/7ℤ',
          description: 'Do all arithmetic mod 7. This is a complete number system.',
          inputs: [
            {
              fields: [
                { id: 'p10a', label: '3 + 5 mod 7 =' },
                { id: 'p10b', label: '4 × 6 mod 7 =' },
                { id: 'p10c', label: '2 + 6 mod 7 =' },
                { id: 'p10d', label: '5 × 3 mod 7 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p10a) === 1, hint: '1' },
                  { correct: num(vals.p10b) === 3, hint: '3 (24 mod 7)' },
                  { correct: num(vals.p10c) === 1, hint: '1' },
                  { correct: num(vals.p10d) === 1, hint: '1 (15 mod 7)' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Find all inverses in ℤ/7ℤ',
              fields: [
                { id: 'p10e', label: '1⁻¹ mod 7 =' },
                { id: 'p10f', label: '2⁻¹ mod 7 =' },
                { id: 'p10g', label: '3⁻¹ mod 7 =' },
                { id: 'p10h', label: '4⁻¹ mod 7 =' },
                { id: 'p10i', label: '5⁻¹ mod 7 =' },
                { id: 'p10j', label: '6⁻¹ mod 7 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p10e) === 1, hint: '1' },
                  { correct: num(vals.p10f) === 4, hint: '4' },
                  { correct: num(vals.p10g) === 5, hint: '5' },
                  { correct: num(vals.p10h) === 2, hint: '2' },
                  { correct: num(vals.p10i) === 3, hint: '3' },
                  { correct: num(vals.p10j) === 6, hint: '6' },
                ];
              },
            },
          ],
          explanation: 'Every nonzero element in ℤ/7ℤ has an inverse, and they come in pairs: (1,1), (2,4), (3,5), (6,6). Notice 6 is its own inverse because <code>6 × 6 = 36 ≡ 1 (mod 7)</code>. This is a <strong>field</strong> — a number system where you can add, subtract, multiply, and divide (by any nonzero element). Fields are the algebraic structure that makes both RSA and elliptic curve cryptography work.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p11',
          label: 'Puzzle 11 — Why Primes?',
          description: 'Compare mod 6 (composite) vs mod 7 (prime).',
          inputs: [
            {
              fields: [
                { id: 'p11a', label: 'Mod 6: does 2 have an inverse?', placeholder: 'yes or no' },
                { id: 'p11b', label: 'Mod 6: does 3 have an inverse?', placeholder: 'yes or no' },
                { id: 'p11c', label: 'Mod 6: does 5 have an inverse?', placeholder: 'yes or no' },
                { id: 'p11d', label: 'Mod 6: 2 × 3 =', placeholder: '?' },
                { id: 'p11e', label: 'Mod 7: can a×b = 0 with a,b ≠ 0?', placeholder: 'yes or no' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p11a === 'no', hint: 'no — GCD(2,6)=2' },
                  { correct: vals.p11b === 'no', hint: 'no — GCD(3,6)=3' },
                  { correct: vals.p11c === 'yes', hint: 'yes — 5×5=25≡1' },
                  { correct: num(vals.p11d) === 0, hint: '0 (zero divisors!)' },
                  { correct: vals.p11e === 'no', hint: 'no — never in a prime field' },
                ];
              },
            },
          ],
          explanation: 'Mod 6: <code>2 × 3 = 6 ≡ 0</code> — two nonzero numbers multiply to zero! These are called <em>zero divisors</em>, and they break everything. You can\'t build reliable crypto on a system with zero divisors. <br><br>Mod 7 (prime): this <strong>never happens</strong>. If <code>a × b ≡ 0 (mod p)</code> then either a or b must be 0. No zero divisors, every element has an inverse, division always works. That\'s why all cryptographic fields use prime moduli.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p12',
          label: 'Puzzle 12 — Field Properties',
          description: 'Verify that ℤ/7ℤ satisfies the field axioms.',
          inputs: [
            {
              fields: [
                { id: 'p12a', label: '(2 + 3) + 4 mod 7 =' },
                { id: 'p12b', label: '2 + (3 + 4) mod 7 =' },
                { id: 'p12c', label: '3 × 5 mod 7 =' },
                { id: 'p12d', label: '5 × 3 mod 7 =' },
                { id: 'p12e', label: '2×(3+4) mod 7 =' },
                { id: 'p12f', label: '(2×3 + 2×4) mod 7 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p12a) === 2, hint: '2 (9 mod 7)' },
                  { correct: num(vals.p12b) === 2, hint: '2 (9 mod 7)' },
                  { correct: num(vals.p12c) === 1, hint: '1 (15 mod 7)' },
                  { correct: num(vals.p12d) === 1, hint: '1 (15 mod 7)' },
                  { correct: num(vals.p12e) === 0, hint: '0 (14 mod 7)' },
                  { correct: num(vals.p12f) === 0, hint: '0 (6+8=14 mod 7)' },
                ];
              },
            },
          ],
          explanation: 'You just verified: <strong>associativity</strong> (grouping doesn\'t matter), <strong>commutativity</strong> (order doesn\'t matter), and the <strong>distributive law</strong> (multiplication distributes over addition). These aren\'t just nice properties — they\'re <em>requirements</em>. Elliptic curve point addition works because the underlying field has these properties. RSA\'s math is consistent because of these properties. Without them, cryptography falls apart.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 5: Cryptography Connections ──
    {
      id: 'sec5',
      title: '§5 — Cryptography Connections',
      shortName: 'Crypto',
      puzzles: [
        {
          id: 'p13',
          label: 'Puzzle 13 — RSA Key Generation',
          description: 'Walk through RSA with small primes: p=5, q=11.',
          inputs: [
            {
              fields: [
                { id: 'p13a', label: 'n = p × q =' },
                { id: 'p13b', label: 'φ(n) = (p-1)(q-1) =' },
                { id: 'p13c', label: 'Choose e=3. Is GCD(3,40)=1?', placeholder: 'yes or no' },
                { id: 'p13d', label: 'd = e⁻¹ mod φ(n) = 3⁻¹ mod 40 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p13a) === 55, hint: '55' },
                  { correct: num(vals.p13b) === 40, hint: '40' },
                  { correct: vals.p13c === 'yes', hint: 'yes — coprime' },
                  { correct: num(vals.p13d) === 27, hint: '27 (3×27=81=2×40+1)' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Encrypt and decrypt m=2',
              fields: [
                { id: 'p13e', label: 'Encrypt: 2^e mod n = 2^3 mod 55 =' },
                { id: 'p13f', label: 'Decrypt: 8^d mod n = 8^27 mod 55 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p13e) === 8, hint: '8' },
                  { correct: num(vals.p13f) === 2, hint: '2 — message recovered!' },
                ];
              },
            },
          ],
          explanation: 'You just did RSA by hand. Public key: (n=55, e=3). Private key: (n=55, d=27). Encrypt message 2: <code>2^3 mod 55 = 8</code>. Decrypt: <code>8^27 mod 55 = 2</code>. The message comes back! This works because of Euler\'s theorem: <code>m^(ed) = m^(1+kφ(n)) ≡ m (mod n)</code>. Real RSA uses 2048-bit primes, but the math is identical to what you just did.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p14',
          label: 'Puzzle 14 — Diffie-Hellman Key Exchange',
          description: 'Public parameters: g=2, p=23. Alice picks a=6, Bob picks b=15.',
          inputs: [
            {
              fields: [
                { id: 'p14a', label: 'Alice sends A = g^a mod p = 2^6 mod 23 =' },
                { id: 'p14b', label: 'Bob sends B = g^b mod p = 2^15 mod 23 =' },
                { id: 'p14c', label: 'Alice computes: B^a mod p = ?^6 mod 23', placeholder: '?' },
                { id: 'p14d', label: 'Bob computes: A^b mod p = ?^15 mod 23', placeholder: '?' },
              ],
              validate(vals) {
                // 2^6 mod 23 = 64 mod 23 = 18
                // 2^15 mod 23 = 32768 mod 23 = 9
                // shared secret: 2^(6*15) mod 23 = 2^90 mod 23
                // 18^6 mod 23 = 9^15 mod 23 = 2^90 mod 23
                // 2^90 mod 23: 2^11 mod 23 = 2048 mod 23 = 1 (since 23 is prime, 2^22 ≡ 1, but 2^11 mod 23 = 2048 mod 23 = 2048 - 89*23 = 2048 - 2047 = 1)
                // Actually: 2^11 = 2048, 2048 / 23 = 89.04..., 89*23 = 2047, so 2048 mod 23 = 1
                // 2^22 ≡ 1, so 2^90 = 2^(4*22 + 2) = (2^22)^4 * 2^2 ≡ 1^4 * 4 = 4 mod 23
                // Let me recheck: A = 2^6 mod 23 = 64 mod 23 = 64 - 2*23 = 64-46 = 18
                // B = 2^15 mod 23. 2^11 = 2048 mod 23 = 1 (since 89*23=2047, 2048-2047=1)
                // So 2^15 = 2^11 * 2^4 ≡ 1 * 16 = 16 mod 23
                // Hmm wait let me recompute. 2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^5=32≡9, 2^6=64≡18, 2^7=128≡128-5*23=128-115=13, 2^8=256≡256-11*23=256-253=3, 2^9=512≡512-22*23=512-506=6, 2^10=1024≡1024-44*23=1024-1012=12, 2^11=2048≡2048-89*23=2048-2047=1
                // So order of 2 mod 23 is 11.
                // 2^15 = 2^(11+4) = 2^11 * 2^4 ≡ 1*16 = 16 mod 23
                // Shared secret: 2^(6*15) mod 23 = 2^90 mod 23. 90 mod 11 = 90 - 8*11 = 90-88 = 2. So 2^90 ≡ 2^2 = 4 mod 23
                // Alice: B^a = 16^6 mod 23. 16 ≡ 2^4, so 16^6 = 2^24. 24 mod 11 = 2. 2^2 = 4.
                // Bob: A^b = 18^15 mod 23. 18 ≡ 2^6, so 18^15 = 2^90. 90 mod 11 = 2. 2^2 = 4.
                return [
                  { correct: num(vals.p14a) === 18, hint: '18 (64 mod 23)' },
                  { correct: num(vals.p14b) === 16, hint: '16' },
                  { correct: num(vals.p14c) === 4, hint: '4 (shared secret!)' },
                  { correct: num(vals.p14d) === 4, hint: '4 (same secret!)' },
                ];
              },
            },
          ],
          explanation: 'Alice and Bob computed the <em>same</em> shared secret (4) without ever transmitting it! An eavesdropper sees g=2, p=23, A=18, B=16 — but recovering the secret requires solving <code>2^x ≡ 18 (mod 23)</code> for x, which is the <strong>discrete logarithm problem</strong>. With 23 it\'s trivial, but with a 2048-bit prime, it\'s computationally infeasible. This is the basis of HTTPS, SSH, and Signal.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p15',
          label: 'Puzzle 15 — The Discrete Log Problem',
          description: 'Forward: computing g^x mod p is easy. Reverse: given g^x mod p, finding x is hard.',
          inputs: [
            {
              fields: [
                { id: 'p15a', label: '2^x ≡ 8 (mod 23) → x =', placeholder: '?' },
                { id: 'p15b', label: '2^x ≡ 18 (mod 23) → x =', placeholder: 'try it!' },
                { id: 'p15c', label: '2^x ≡ 13 (mod 23) → x =', placeholder: 'try it!' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p15a) === 3, hint: '3 (2^3=8, easy!)' },
                  { correct: num(vals.p15b) === 6, hint: '6 (had to search)' },
                  { correct: num(vals.p15c) === 7, hint: '7 (2^7=128≡13)' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Feel the asymmetry',
              fields: [
                { id: 'p15d', label: '2^17 mod 23 = (compute it)', placeholder: '?' },
                { id: 'p15e', label: 'Easy or hard?', placeholder: 'easy or hard' },
                { id: 'p15f', label: 'Now: 2^x ≡ 12 (mod 23). Find x =', placeholder: '?' },
                { id: 'p15g', label: 'Easy or hard?', placeholder: 'easy or hard' },
              ],
              validate(vals) {
                // 2^17 mod 23: 17 mod 11 = 6, 2^6 = 64 mod 23 = 18. Wait...
                // Actually let me just compute: 2^11 ≡ 1 mod 23, so 2^17 = 2^(11+6) = 2^6 = 64 mod 23 = 18
                // Hmm, but this gives 18, not a new number. Let me reconsider.
                // Actually this is fine — 2^17 mod 23 = 18
                // And 2^x ≡ 12 mod 23: from our list, 2^10 = 12. So x = 10.
                return [
                  { correct: num(vals.p15d) === 18, hint: '18' },
                  { correct: vals.p15e === 'easy', hint: 'easy — just compute' },
                  { correct: num(vals.p15f) === 10, hint: '10' },
                  { correct: vals.p15g === 'hard', hint: 'hard — had to search' },
                ];
              },
            },
          ],
          explanation: 'Computing <code>2^17 mod 23</code> is fast — just multiply and reduce. But finding x in <code>2^x ≡ 12 (mod 23)</code>? You had to try values one by one. With small numbers, brute force works. With 2048-bit primes, there are more possibilities than atoms in the universe. <br><br><strong>This asymmetry is the foundation of all public-key cryptography.</strong> Forward (exponentiation) is easy; reverse (discrete log) is hard. RSA, Diffie-Hellman, DSA, elliptic curves — they all exploit a version of this one-way trapdoor.',
          explanationType: 'correct-exp',
        },
      ],
    },
  ],
};
