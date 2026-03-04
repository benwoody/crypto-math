function num(v) { return parseFloat(v); }

export default {
  title: 'Module 0: Foundations',
  sections: [
    // ── SECTION 1: Numbers and Their Personalities ──
    {
      id: 'sec1',
      title: '\u00a71 \u2014 Numbers and Their Personalities',
      shortName: 'Numbers',
      puzzles: [
        {
          id: 'p1',
          label: 'Puzzle 1 \u2014 Negative Division',
          description: 'Give the quotient and remainder for each.',
          inputs: [
            {
              fields: [
                { id: 'p1a', label: '17 \u00f7 5 \u2192 Q:', type: 'dual', label2: 'R:', placeholder1: '?', placeholder2: '?' },
                { id: 'p1b', label: '-17 \u00f7 5 \u2192 Q:', type: 'dual', label2: 'R:', placeholder1: '?', placeholder2: '?' },
                { id: 'p1c', label: '17 \u00f7 -5 \u2192 Q:', type: 'dual', label2: 'R:', placeholder1: '?', placeholder2: '?' },
              ],
              validate(vals) {
                const results = [];
                // p1a: 17/5 = Q:3, R:2
                const q1 = num(vals.p1a_q), r1 = num(vals.p1a_r);
                results.push({ correct: q1 === 3 && r1 === 2, hint: q1 === 3 && r1 === 2 ? '' : '3 r 2' });
                // p1b: -17/5 accepts two conventions
                const q2 = num(vals.p1b_q), r2 = num(vals.p1b_r);
                const ok2 = (q2 === -4 && r2 === 3) || (q2 === -3 && r2 === -2);
                results.push({ correct: ok2, hint: ok2 ? '' : '-4 r 3 or -3 r -2' });
                // p1c: 17/-5 accepts two conventions
                const q3 = num(vals.p1c_q), r3 = num(vals.p1c_r);
                const ok3 = (q3 === -4 && r3 === -3) || (q3 === -3 && r3 === 2);
                results.push({ correct: ok3, hint: ok3 ? '' : '-4 r -3 or -3 r 2' });
                return results;
              },
            },
          ],
          explanation: '<strong>Key insight:</strong> Negative division has two valid conventions. In math (Euclidean), remainders are always positive: <code>-17 \u00f7 5 = -4 remainder 3</code> because <code>-4 \u00d7 5 + 3 = -17</code>. In most programming languages, remainders keep the sign of the dividend: <code>-17 \u00f7 5 = -3 remainder -2</code>. Both are correct \u2014 what matters is that <code>quotient \u00d7 divisor + remainder = original number</code>. In cryptography, we almost always use the positive remainder (math convention).',
          explanationType: 'hint-exp',
        },
        {
          id: 'p2',
          label: 'Puzzle 2 \u2014 Big Numbers',
          description: 'Estimate without a calculator.',
          inputs: [
            {
              fields: [
                { id: 'p2a', label: '2^10 closer to:', placeholder: '1000 or 10000', width: '180px' },
                { id: 'p2b', label: '2^20 closer to:', placeholder: '100000 or 1000000', width: '200px' },
                { id: 'p2c', label: '2^256 has ~? digits:', placeholder: '?' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p2a.includes('1000') && !vals.p2a.includes('10000'), hint: '1000' },
                  { correct: vals.p2b.includes('1000000') || vals.p2b.includes('million'), hint: '1,000,000' },
                  (() => {
                    const d = num(vals.p2c);
                    return { correct: d >= 75 && d <= 80, hint: '~77' };
                  })(),
                ];
              },
            },
          ],
          explanation: '<code>2^10 = 1,024</code> (close to 1,000). <code>2^20 = 1,048,576</code> (close to 1 million). Since <code>2^10 \u2248 10^3</code>, we get <code>2^256 \u2248 10^77</code> \u2014 a 77-digit number. For comparison, the number of atoms in the observable universe is roughly <code>10^80</code>. A 256-bit key space is astronomically large.',
          explanationType: 'hint-exp',
        },
        {
          id: 'p3',
          label: 'Puzzle 3 \u2014 Edge Cases',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p3a', label: '0 \u00d7 anything =' },
                { id: 'p3b', label: 'anything \u00f7 0 =' },
                { id: 'p3c', label: '0^0 =' },
                { id: 'p3d', label: 'anything^0 =' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p3a === '0', hint: '0' },
                  { correct: vals.p3b.includes('undefined') || vals.p3b.includes('infinity') || vals.p3b.includes('error') || vals.p3b.includes('impossible'), hint: 'undefined' },
                  { correct: vals.p3c === '1' || vals.p3c.includes('undefined') || vals.p3c.includes('debated'), hint: 'convention: 1' },
                  { correct: vals.p3d === '1', hint: '1' },
                ];
              },
            },
          ],
          explanation: '<code>0^0</code> is mathematically debated but conventionally defined as <code>1</code> in combinatorics and computer science. <code>anything^0 = 1</code> because exponentiation starts from the multiplicative identity. Division by zero is undefined \u2014 not infinity, not an error, just <em>not a thing</em>. In modular arithmetic, this becomes important: we can\'t divide by a number unless it has a <em>modular inverse</em>, and zero never does.',
          explanationType: 'hint-exp',
        },
      ],
    },

    // ── SECTION 2: The Remainder Is the Point ──
    {
      id: 'sec2',
      title: '\u00a72 \u2014 The Remainder Is the Point',
      shortName: 'Remainders',
      puzzles: [
        {
          id: 'p4',
          label: 'Puzzle 4 \u2014 Mod Practice',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p4a', label: '23 mod 7 =' },
                { id: 'p4b', label: '100 mod 10 =' },
                { id: 'p4c', label: '13 mod 13 =' },
                { id: 'p4d', label: '7 mod 13 =' },
                { id: 'p4e', label: '256 mod 16 =' },
                { id: 'p4f', label: '1 mod anything =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p4a) === 2, hint: '2' },
                  { correct: num(vals.p4b) === 0, hint: '0' },
                  { correct: num(vals.p4c) === 0, hint: '0' },
                  { correct: num(vals.p4d) === 7, hint: '7' },
                  { correct: num(vals.p4e) === 0, hint: '0' },
                  { correct: num(vals.p4f) === 1 || vals.p4f === '1', hint: '1' },
                ];
              },
            },
          ],
          explanation: 'Key patterns: when the number is <em>smaller</em> than the modulus, the result is just the number itself (<code>7 mod 13 = 7</code>). When the number equals the modulus, the result is <code>0</code>. And <code>1 mod anything = 1</code> (as long as the modulus is greater than 1). These patterns are fundamental.',
          explanationType: 'hint-exp',
        },
        {
          id: 'p5',
          label: 'Puzzle 5 \u2014 Clock Math',
          description: '12-hour clock, starting at 0.',
          inputs: [
            {
              fields: [
                { id: 'p5a', label: '9 + 8 hours =' },
                { id: 'p5b', label: '3 - 7 hours =' },
                { id: 'p5c', label: '0 + 25 hours =' },
                { id: 'p5d', label: '0 + 1000000 hours =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p5a) === 5, hint: '5' },
                  { correct: num(vals.p5b) === 8, hint: '8' },
                  { correct: num(vals.p5c) === 1, hint: '1' },
                  { correct: num(vals.p5d) === 4, hint: '4' },
                ];
              },
            },
          ],
          explanation: '<code>1,000,000 mod 12 = 4</code>. No matter how enormous the input, mod always constrains the output to a finite range. This is the core principle behind finite fields in cryptography \u2014 you take the infinite world of integers and "wrap" it into a manageable space using a prime modulus.',
          explanationType: 'hint-exp',
        },
        {
          id: 'p6',
          label: 'Puzzle 6 \u2014 Why Mods Wrap',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p6a', label: 'mod 10, possible results:', placeholder: 'e.g. 0-?' },
                { id: 'p6b', label: 'mod 256, possible results:', placeholder: 'e.g. 0-?' },
                { id: 'p6c', label: 'mod 2, possible results:', placeholder: 'e.g. 0-?' },
                { id: 'p6d', label: 'mod 2 tells you:', placeholder: 'what about the number?', width: '220px' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p6a.includes('0') && vals.p6a.includes('9'), hint: '0-9' },
                  { correct: vals.p6b.includes('0') && vals.p6b.includes('255'), hint: '0-255' },
                  { correct: vals.p6c.includes('0') && vals.p6c.includes('1'), hint: '0-1' },
                  { correct: vals.p6d.includes('even') || vals.p6d.includes('odd'), hint: 'even/odd' },
                ];
              },
            },
          ],
          explanation: '<code>mod 2</code> is the simplest classifier \u2014 it tells you if a number is even (result 0) or odd (result 1). This is actually a one-bit piece of information. Every mod operation is a classifier that puts numbers into buckets. <code>mod 256</code> has 256 buckets (0-255) \u2014 exactly one byte. <code>mod p</code> where p is a 256-bit prime has an astronomical number of buckets, but the principle is identical.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 3: Exponents and Why They Matter ──
    {
      id: 'sec3',
      title: '\u00a73 \u2014 Exponents and Why They Matter',
      shortName: 'Exponents',
      puzzles: [
        {
          id: 'p7',
          label: 'Puzzle 7 \u2014 Exponent Intuition',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p7a', label: '3^3 =' },
                { id: 'p7b', label: '5^3 =' },
                { id: 'p7c', label: '10^4 =' },
                { id: 'p7d', label: '2^8 =' },
                { id: 'p7e', label: '2^16 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p7a) === 27, hint: '27' },
                  { correct: num(vals.p7b) === 125, hint: '125' },
                  { correct: num(vals.p7c) === 10000, hint: '10000' },
                  { correct: num(vals.p7d) === 256, hint: '256' },
                  { correct: num(vals.p7e) === 65536, hint: '65536' },
                ];
              },
            },
          ],
          explanation: '<code>2^8 = 256</code> (one byte). <code>2^16 = 65,536</code> (two bytes, or a uint16). These powers of 2 are the engineer\'s vocabulary. You\'ll see them everywhere in crypto \u2014 field sizes, hash outputs, key lengths.',
          explanationType: 'hint-exp',
        },
        {
          id: 'p8',
          label: 'Puzzle 8 \u2014 Exponent Rules',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p8a', label: '2^3 \u00d7 2^4 = 2^?' },
                { id: 'p8b', label: '(2^3)^4 = 2^?' },
                { id: 'p8c', label: '2^10 \u00f7 2^3 = 2^?' },
                { id: 'p8d', label: '5^0 =' },
                { id: 'p8e', label: '2^-1 = (fraction)' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p8a) === 7, hint: '7' },
                  { correct: num(vals.p8b) === 12, hint: '12' },
                  { correct: num(vals.p8c) === 7, hint: '7' },
                  { correct: num(vals.p8d) === 1, hint: '1' },
                  { correct: vals.p8e.includes('1/2') || vals.p8e === '0.5' || vals.p8e.includes('\u00bd'), hint: '1/2' },
                ];
              },
            },
          ],
          explanation: 'The rules: <code>a^m \u00d7 a^n = a^(m+n)</code>, <code>(a^m)^n = a^(m\u00d7n)</code>, <code>a^m \u00f7 a^n = a^(m-n)</code>. Negative exponents mean reciprocals: <code>2^-1 = 1/2</code>. In modular arithmetic, <code>2^-1 mod p</code> means "the modular inverse of 2" \u2014 a number that when multiplied by 2 gives 1 mod p. That\'s a key concept in Module 1.',
          explanationType: 'hint-exp',
        },
        {
          id: 'p9',
          label: 'Puzzle 9 \u2014 Exponents Meet Mod',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p9a', label: '2^4 mod 5 =' },
                { id: 'p9b', label: '3^3 mod 7 =' },
                { id: 'p9c', label: '2^10 mod 7 =' },
                { id: 'p9d', label: '5^3 mod 13 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p9a) === 1, hint: '1' },
                  { correct: num(vals.p9b) === 6, hint: '6' },
                  { correct: num(vals.p9c) === 2, hint: '2' },
                  { correct: num(vals.p9d) === 8, hint: '8' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Find the pattern',
              fields: [
                { id: 'p9e1', label: '2^1 mod 7 =' },
                { id: 'p9e2', label: '2^2 mod 7 =' },
                { id: 'p9e3', label: '2^3 mod 7 =' },
                { id: 'p9e4', label: '2^4 mod 7 =' },
                { id: 'p9e5', label: '2^5 mod 7 =' },
                { id: 'p9e6', label: '2^6 mod 7 =' },
                { id: 'p9e7', label: 'So 2^256 mod 7 =' },
              ],
              validate(vals) {
                const pattern = [2, 4, 1, 2, 4, 1];
                const results = [];
                const ids = ['p9e1', 'p9e2', 'p9e3', 'p9e4', 'p9e5', 'p9e6'];
                ids.forEach((id, i) => {
                  results.push({ correct: num(vals[id]) === pattern[i], hint: String(pattern[i]) });
                });
                results.push({ correct: num(vals.p9e7) === 2, hint: '2' });
                return results;
              },
            },
          ],
          explanation: 'The pattern repeats every 3: <code>2, 4, 1, 2, 4, 1, ...</code>. The cycle length is 3 (which divides 6 = 7\u22121 \u2014 not a coincidence!). To find <code>2^256 mod 7</code>, we just need to know where 256 lands in the cycle. <code>256 mod 3 = 1</code> (since 256 = 85\u00d73 + 1), so <code>2^256</code> is at the same position as <code>2^1</code>, which means <code>2^256 mod 7 = 2</code>. This is Fermat\'s Little Theorem in action: <code>a^(p-1) \u2261 1 mod p</code> for prime p. So <code>2^6 mod 7 = 1</code>, and everything cycles with period dividing 6.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 4: Variables and Solving ──
    {
      id: 'sec4',
      title: '\u00a74 \u2014 Variables and Solving',
      shortName: 'Variables',
      puzzles: [
        {
          id: 'p10',
          label: 'Puzzle 10 \u2014 Solve for x',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p10a', label: 'x + 7 = 15 \u2192 x =' },
                { id: 'p10b', label: '3x = 21 \u2192 x =' },
                { id: 'p10c', label: 'x - 12 = -4 \u2192 x =' },
                { id: 'p10d', label: 'x/4 = 8 \u2192 x =' },
                { id: 'p10e', label: '2x + 3 = 17 \u2192 x =' },
                { id: 'p10f', label: '5(x-2) = 30 \u2192 x =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p10a) === 8, hint: '8' },
                  { correct: num(vals.p10b) === 7, hint: '7' },
                  { correct: num(vals.p10c) === 8, hint: '8' },
                  { correct: num(vals.p10d) === 32, hint: '32' },
                  { correct: num(vals.p10e) === 7, hint: '7' },
                  { correct: num(vals.p10f) === 8, hint: '8' },
                ];
              },
            },
          ],
          explanation: 'If these were easy, good \u2014 this is the baseline for working with equations. Every cryptographic formula is just a series of these operations with much bigger numbers and a mod at the end.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p11',
          label: 'Puzzle 11 \u2014 Substitution (a=3, b=5)',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p11a', label: 'a + b =' },
                { id: 'p11b', label: 'a \u00d7 b =' },
                { id: 'p11c', label: 'a^b =' },
                { id: 'p11d', label: 'b^a =' },
                { id: 'p11e', label: '(a+b) mod 4 =' },
                { id: 'p11f', label: '(a\u00d7b) mod 7 =' },
                { id: 'p11g', label: '(a^b) mod 7 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p11a) === 8, hint: '8' },
                  { correct: num(vals.p11b) === 15, hint: '15' },
                  { correct: num(vals.p11c) === 243, hint: '243' },
                  { correct: num(vals.p11d) === 125, hint: '125' },
                  { correct: num(vals.p11e) === 0, hint: '0' },
                  { correct: num(vals.p11f) === 1, hint: '1' },
                  { correct: num(vals.p11g) === 5, hint: '5' },
                ];
              },
            },
          ],
          explanation: '<code>3^5 = 243</code>, <code>243 mod 7 = 5</code> (since 7\u00d734 = 238, 243-238 = 5). Notice how <code>a^b \u2260 b^a</code> \u2014 exponentiation is not commutative. This asymmetry is exploited in cryptography.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 5: Evenness, Oddness, and Divisibility ──
    {
      id: 'sec5',
      title: '\u00a75 \u2014 Evenness, Oddness, and Divisibility',
      shortName: 'Divisibility',
      puzzles: [
        {
          id: 'p12',
          label: 'Puzzle 12 \u2014 Quick Checks',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p12a', label: '2,347 is:', placeholder: 'even or odd', width: '160px' },
                { id: 'p12b', label: '1,000,000 is:', placeholder: 'even or odd', width: '160px' },
                { id: 'p12c', label: 'odd + odd =', placeholder: 'even or odd', width: '160px' },
                { id: 'p12d', label: 'even + odd =', placeholder: 'even or odd', width: '160px' },
                { id: 'p12e', label: 'any \u00d7 even =', placeholder: 'even or odd', width: '160px' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p12a === 'odd', hint: 'odd' },
                  { correct: vals.p12b === 'even', hint: 'even' },
                  { correct: vals.p12c === 'even', hint: 'even' },
                  { correct: vals.p12d === 'odd', hint: 'odd' },
                  { correct: vals.p12e === 'even', hint: 'even' },
                ];
              },
            },
          ],
          explanation: 'Even/odd is just <code>mod 2</code>. The rules: odd+odd=even, even+odd=odd, anything\u00d7even=even. These are your first taste of <em>arithmetic in a finite system</em> \u2014 all of modular arithmetic follows these same kinds of patterns, just with larger moduli.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p14',
          label: 'Puzzle 14 \u2014 Primes',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p14a', label: 'Is 17 prime?', placeholder: 'yes or no' },
                { id: 'p14b', label: 'Is 51 prime?', placeholder: 'yes or no' },
                { id: 'p14c', label: 'Is 97 prime?', placeholder: 'yes or no' },
                { id: 'p14d', label: 'Why is 2 special?', placeholder: 'because...', width: '240px' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p14a === 'yes', hint: 'yes' },
                  { correct: vals.p14b === 'no', hint: 'no (51=3\u00d717)' },
                  { correct: vals.p14c === 'yes', hint: 'yes' },
                  {
                    correct: (vals.p14d.includes('even') && vals.p14d.includes('prime')) || vals.p14d.includes('only even'),
                    hint: 'only even prime',
                  },
                ];
              },
            },
          ],
          explanation: '51 = 3 \u00d7 17, so it\'s not prime. Quick divisibility trick: if the digits sum to a multiple of 3 (5+1=6, which is divisible by 3), the number is divisible by 3. 2 is the only even prime \u2014 every other even number is divisible by 2. Primes are the atoms of number theory, and prime fields are the foundation of all elliptic curve cryptography.',
          explanationType: 'hint-exp',
        },
      ],
    },

    // ── SECTION 6: Binary and Hex ──
    {
      id: 'sec6',
      title: '\u00a76 \u2014 Binary and Hex',
      shortName: 'Binary/Hex',
      puzzles: [
        {
          id: 'p15',
          label: 'Puzzle 15 \u2014 Binary',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p15a', label: '13 in binary =' },
                { id: 'p15b', label: '1011 binary \u2192 decimal =' },
                { id: 'p15c', label: '255 in binary =' },
                { id: 'p15d', label: '8 bits can represent:', placeholder: '? values' },
                { id: 'p15e', label: '256 bits can represent:', placeholder: '2^?' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p15a === '1101', hint: '1101' },
                  { correct: num(vals.p15b) === 11, hint: '11' },
                  { correct: vals.p15c === '11111111', hint: '11111111' },
                  { correct: num(vals.p15d) === 256 || vals.p15d.includes('256'), hint: '256' },
                  { correct: vals.p15e.includes('256') || vals.p15e.includes('2^256'), hint: '2^256' },
                ];
              },
            },
          ],
          explanation: '8 bits = <code>2^8 = 256</code> possible values (0 to 255). 256 bits = <code>2^256</code> possible values \u2014 that 77-digit number from earlier. Every additional bit doubles the number of possibilities, which is why 256-bit keys are astronomically more secure than 128-bit keys.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p16',
          label: 'Puzzle 16 \u2014 Hex',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p16a', label: '255 in hex =', placeholder: '0x??' },
                { id: 'p16b', label: '0x1A in decimal =' },
                { id: 'p16c', label: '0xFF in binary =' },
                { id: 'p16d', label: '256-bit = ? hex chars:' },
                { id: 'p16e', label: 'ETH address (20B) = ? hex:' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p16a === 'ff' || vals.p16a === '0xff', hint: '0xFF' },
                  { correct: num(vals.p16b) === 26, hint: '26' },
                  { correct: vals.p16c === '11111111', hint: '11111111' },
                  { correct: num(vals.p16d) === 64, hint: '64' },
                  { correct: num(vals.p16e) === 40, hint: '40' },
                ];
              },
            },
          ],
          explanation: 'Each hex digit represents 4 bits (a nibble). So 256 bits = 64 hex chars. An Ethereum address is 20 bytes = 160 bits = 40 hex chars (that\'s what you see after 0x). A full keccak256 hash is 32 bytes = 64 hex chars. These conversions become second nature.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p17',
          label: 'Puzzle 17 \u2014 Connecting It',
          description: null,
          inputs: [
            {
              fields: [
                { id: 'p17a', label: '255 = 2^? - 1' },
                { id: 'p17b', label: 'uint8 overflow: mod ?' },
                { id: 'p17c', label: 'uint256 is math mod:', placeholder: '2^?' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p17a) === 8, hint: '8' },
                  { correct: num(vals.p17b) === 256, hint: '256' },
                  { correct: vals.p17c.includes('256') || vals.p17c === '2^256', hint: '2^256' },
                ];
              },
            },
          ],
          explanation: '<strong>This is the connection.</strong> Solidity\'s <code>uint8</code> is math mod 256. <code>uint256</code> is math mod 2^256. Every integer operation in the EVM is modular arithmetic. When you write <code>a + b</code> in Solidity, the machine is computing <code>(a + b) mod 2^256</code>. You\'ve been doing modular arithmetic this entire time \u2014 you just didn\'t call it that.',
          explanationType: 'correct-exp',
        },
      ],
    },
  ],
};
