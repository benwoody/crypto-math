function num(v) { return parseFloat(v); }

export default {
  title: 'Module 2: Groups & Fields',
  sections: [
    // ── SECTION 1: What Is a Group? ──
    {
      id: 'sec1',
      title: '§1 — What Is a Group?',
      shortName: 'Groups',
      puzzles: [
        {
          id: 'p1',
          label: 'Puzzle 1 — Checking Group Axioms',
          description: 'Verify the four group axioms for (ℤ/7ℤ, +): closure, identity, inverses, associativity.',
          inputs: [
            {
              fields: [
                { id: 'p1a', label: 'Closure: (3 + 5) mod 7 =' },
                { id: 'p1b', label: 'Is the result in {0,1,2,3,4,5,6}?', placeholder: 'yes or no' },
                { id: 'p1c', label: 'Identity element for addition:' },
                { id: 'p1d', label: 'Additive inverse of 3 mod 7:' },
                { id: 'p1e', label: 'Associativity: (2+3)+4 mod 7 =' },
                { id: 'p1f', label: '2+(3+4) mod 7 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p1a) === 1, hint: '1' },
                  { correct: vals.p1b === 'yes', hint: 'yes — 1 ∈ {0,...,6}' },
                  { correct: num(vals.p1c) === 0, hint: '0 (a + 0 = a)' },
                  { correct: num(vals.p1d) === 4, hint: '4 (3 + 4 = 7 ≡ 0)' },
                  { correct: num(vals.p1e) === 2, hint: '2 (5+4=9≡2)' },
                  { correct: num(vals.p1f) === 2, hint: '2 (2+0=2) — matches!' },
                ];
              },
            },
          ],
          explanation: 'A <strong>group</strong> is a set with an operation satisfying four axioms: <em>closure</em> (result stays in the set), <em>associativity</em> (grouping doesn\'t matter), an <em>identity element</em> (adding 0 changes nothing), and <em>inverses</em> (every element can be "undone"). (ℤ/7ℤ, +) satisfies all four — it\'s a group of order 7. These axioms are the minimum structure needed for cryptography to work.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p2',
          label: 'Puzzle 2 — Multiplicative Groups',
          description: 'Now consider (ℤ/7ℤ)* = {1,2,3,4,5,6} under multiplication mod 7.',
          inputs: [
            {
              fields: [
                { id: 'p2a', label: 'Identity element for multiplication:' },
                { id: 'p2b', label: 'Inverse of 3 (3×? ≡ 1 mod 7):' },
                { id: 'p2c', label: 'Inverse of 6 (6×? ≡ 1 mod 7):' },
                { id: 'p2d', label: 'Order of this group (how many elements):' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p2a) === 1, hint: '1 (a × 1 = a)' },
                  { correct: num(vals.p2b) === 5, hint: '5 (3×5=15≡1)' },
                  { correct: num(vals.p2c) === 6, hint: '6 (6×6=36≡1)' },
                  { correct: num(vals.p2d) === 6, hint: '6 elements' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Why doesn\'t mod 6 work?',
              fields: [
                { id: 'p2e', label: '2 × 3 mod 6 =', placeholder: '?' },
                { id: 'p2f', label: 'Does 2 have an inverse mod 6?', placeholder: 'yes or no' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p2e) === 0, hint: '0 — zero divisor!' },
                  { correct: vals.p2f === 'no', hint: 'no — GCD(2,6)=2' },
                ];
              },
            },
          ],
          explanation: '(ℤ/7ℤ)* is the <em>multiplicative group</em> mod 7 — all nonzero elements with multiplication. Identity is 1, and every element has an inverse because 7 is prime. But {1,2,3,4,5} under × mod 6 is <em>not</em> a group: 2×3=0 falls outside the set, and 2 has no inverse. <strong>Multiplicative groups only work with prime moduli</strong> — that\'s why every cryptographic system uses primes.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p3',
          label: 'Puzzle 3 — Not Everything Is a Group',
          description: 'Classify each as a group or not. Think about which axiom fails.',
          inputs: [
            {
              fields: [
                { id: 'p3a', label: '({0,...,6}, ×) mod 7 — group?', placeholder: 'yes or no' },
                { id: 'p3b', label: 'Why not?', placeholder: 'which axiom fails?', width: '200px' },
                { id: 'p3c', label: '({1,...,6}, ×) mod 7 — group?', placeholder: 'yes or no' },
                { id: 'p3d', label: '({0,...,6}, +) mod 7 — group?', placeholder: 'yes or no' },
                { id: 'p3e', label: 'Order of (ℤ/pℤ)* for any prime p =', placeholder: 'formula', width: '120px' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p3a === 'no', hint: 'no' },
                  { correct: vals.p3b.includes('inverse') || vals.p3b.includes('0'), hint: '0 has no multiplicative inverse' },
                  { correct: vals.p3c === 'yes', hint: 'yes — (ℤ/7ℤ)*' },
                  { correct: vals.p3d === 'yes', hint: 'yes — (ℤ/7ℤ, +)' },
                  { correct: vals.p3e.includes('p-1') || vals.p3e.includes('p - 1'), hint: 'p - 1' },
                ];
              },
            },
          ],
          explanation: 'Including 0 in a multiplicative group breaks the inverse axiom — 0 × anything = 0, never 1. That\'s why the multiplicative group (ℤ/pℤ)* excludes 0 and has order p-1, not p. This distinction matters: Diffie-Hellman operates in (ℤ/pℤ)* (order p-1), while elliptic curves have their own group order. <strong>Group order = the number of elements</strong>, and it determines the security of every DLP-based system.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 2: Cyclic Groups and Generators ──
    {
      id: 'sec2',
      title: '§2 — Cyclic Groups and Generators',
      shortName: 'Generators',
      puzzles: [
        {
          id: 'p4',
          label: 'Puzzle 4 — Powers of a Generator',
          description: 'Compute all powers of 3 in (ℤ/7ℤ)*. Does 3 generate the entire group?',
          inputs: [
            {
              fields: [
                { id: 'p4a', label: '3¹ mod 7 =' },
                { id: 'p4b', label: '3² mod 7 =' },
                { id: 'p4c', label: '3³ mod 7 =' },
                { id: 'p4d', label: '3⁴ mod 7 =' },
                { id: 'p4e', label: '3⁵ mod 7 =' },
                { id: 'p4f', label: '3⁶ mod 7 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p4a) === 3, hint: '3' },
                  { correct: num(vals.p4b) === 2, hint: '2 (9 mod 7)' },
                  { correct: num(vals.p4c) === 6, hint: '6 (27 mod 7)' },
                  { correct: num(vals.p4d) === 4, hint: '4 (81 mod 7)' },
                  { correct: num(vals.p4e) === 5, hint: '5 (243 mod 7)' },
                  { correct: num(vals.p4f) === 1, hint: '1 (729 mod 7)' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus',
              fields: [
                { id: 'p4g', label: 'Elements visited: all 6?', placeholder: 'yes or no' },
                { id: 'p4h', label: 'Is 3 a generator of (ℤ/7ℤ)*?', placeholder: 'yes or no' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p4g === 'yes', hint: 'yes — {3,2,6,4,5,1}' },
                  { correct: vals.p4h === 'yes', hint: 'yes — generates all elements' },
                ];
              },
            },
          ],
          explanation: '3 visits every element of (ℤ/7ℤ)*: {3, 2, 6, 4, 5, 1}. It\'s a <strong>generator</strong> — every element can be written as a power of 3. A group where this is possible is called <strong>cyclic</strong>. In Diffie-Hellman, the public parameter g must be a generator of the group. If it isn\'t, security can be catastrophically weakened.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p5',
          label: 'Puzzle 5 — Not Every Element Generates',
          description: 'Now try 2 in (ℤ/7ℤ)*. Compute powers until you cycle back to 1.',
          inputs: [
            {
              fields: [
                { id: 'p5a', label: '2¹ mod 7 =' },
                { id: 'p5b', label: '2² mod 7 =' },
                { id: 'p5c', label: '2³ mod 7 =' },
                { id: 'p5d', label: 'Elements visited:',  placeholder: 'e.g. 2,4,1', width: '160px' },
                { id: 'p5e', label: 'Order of 2 (smallest k where 2ᵏ≡1):' },
                { id: 'p5f', label: 'Is 2 a generator?', placeholder: 'yes or no' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p5a) === 2, hint: '2' },
                  { correct: num(vals.p5b) === 4, hint: '4' },
                  { correct: num(vals.p5c) === 1, hint: '1 — already cycled!' },
                  { correct: vals.p5d.includes('2') && vals.p5d.includes('4') && vals.p5d.includes('1'), hint: '{2, 4, 1}' },
                  { correct: num(vals.p5e) === 3, hint: '3' },
                  { correct: vals.p5f === 'no', hint: 'no — only 3 of 6 elements' },
                ];
              },
            },
          ],
          explanation: '2 only generates the subgroup {1, 2, 4} — order 3, which divides 6. Using a non-generator as the base in Diffie-Hellman means the shared secret comes from a smaller set, making brute force easier. If the order is k instead of p-1, an attacker only needs to search k values instead of p-1. <strong>Always use a generator of the full group.</strong>',
          explanationType: 'correct-exp',
        },
        {
          id: 'p6',
          label: 'Puzzle 6 — Generators of (ℤ/23ℤ)*',
          description: 'Test whether g=5 generates (ℤ/23ℤ)*, which has order 22.',
          inputs: [
            {
              fields: [
                { id: 'p6a', label: '5¹ mod 23 =' },
                { id: 'p6b', label: '5² mod 23 =' },
                { id: 'p6c', label: '5¹¹ mod 23 =' },
                { id: 'p6d', label: '5²² mod 23 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p6a) === 5, hint: '5' },
                  { correct: num(vals.p6b) === 2, hint: '2 (25 mod 23)' },
                  { correct: num(vals.p6c) === 22, hint: '22' },
                  { correct: num(vals.p6d) === 1, hint: '1' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Generator test',
              fields: [
                { id: 'p6e', label: 'Order of 5 in (ℤ/23ℤ)*:', placeholder: '?' },
                { id: 'p6f', label: 'Is 5 a generator?', placeholder: 'yes or no' },
                { id: 'p6g', label: 'Quick test: 5¹¹ ≡ 1?', placeholder: 'yes or no' },
                { id: 'p6h', label: 'φ(22) = number of generators =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p6e) === 22, hint: '22 — full group order' },
                  { correct: vals.p6f === 'yes', hint: 'yes' },
                  { correct: vals.p6g === 'no', hint: 'no — 5¹¹≡22≠1, so order isn\'t 11' },
                  { correct: num(vals.p6h) === 10, hint: '10 (φ(22) = φ(2)×φ(11) = 1×10)' },
                ];
              },
            },
          ],
          explanation: 'To test if g is a generator of order n, check that g^(n/q) ≢ 1 for each prime factor q of n. For n=22, factors are 2 and 11: we checked 5¹¹ ≡ 22 ≠ 1, and 5² ≡ 2 ≠ 1, so 5 has full order 22. <strong>φ(22) = 10</strong> generators exist out of 22 elements. In real DH parameter generation, this test ensures the generator spans the full group.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 3: Group Order and Lagrange's Theorem ──
    {
      id: 'sec3',
      title: '§3 — Group Order and Lagrange\'s Theorem',
      shortName: 'Lagrange',
      puzzles: [
        {
          id: 'p7',
          label: 'Puzzle 7 — Subgroup Orders',
          description: 'Find the order (smallest k where aᵏ ≡ 1) of each element in (ℤ/7ℤ)*.',
          inputs: [
            {
              fields: [
                { id: 'p7a', label: 'Order of 1:' },
                { id: 'p7b', label: 'Order of 2:' },
                { id: 'p7c', label: 'Order of 3:' },
                { id: 'p7d', label: 'Order of 4:' },
                { id: 'p7e', label: 'Order of 5:' },
                { id: 'p7f', label: 'Order of 6:' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p7a) === 1, hint: '1 (1¹=1)' },
                  { correct: num(vals.p7b) === 3, hint: '3 (2,4,1)' },
                  { correct: num(vals.p7c) === 6, hint: '6 (generator)' },
                  { correct: num(vals.p7d) === 3, hint: '3 (4,2,1)' },
                  { correct: num(vals.p7e) === 6, hint: '6 (generator)' },
                  { correct: num(vals.p7f) === 2, hint: '2 (6,1)' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Spot the pattern',
              fields: [
                { id: 'p7g', label: 'All orders are divisors of:', placeholder: '?' },
                { id: 'p7h', label: 'Can any element have order 4?', placeholder: 'yes or no' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p7g) === 6, hint: '6 (the group order)' },
                  { correct: vals.p7h === 'no', hint: 'no — 4 doesn\'t divide 6' },
                ];
              },
            },
          ],
          explanation: 'The orders are {1, 2, 3, 6} — all divisors of 6. No element has order 4 or 5 because these don\'t divide 6. This is <strong>Lagrange\'s Theorem</strong>: the order of any element must divide the order of the group. This isn\'t just a curiosity — it constrains the structure of every cryptographic group and determines which subgroup attacks are possible.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p8',
          label: 'Puzzle 8 — Lagrange in (ℤ/23ℤ)*',
          description: 'The group (ℤ/23ℤ)* has order 22. Lagrange constrains which element orders are possible.',
          inputs: [
            {
              fields: [
                { id: 'p8a', label: 'Divisors of 22:', placeholder: 'e.g. 1,2,...', width: '200px' },
                { id: 'p8b', label: 'Order of element 22 (≡ -1):' },
                { id: 'p8c', label: 'Order of element 2:' },
                { id: 'p8d', label: 'Can any element have order 7?', placeholder: 'yes or no' },
              ],
              validate(vals) {
                const divs = vals.p8a.replace(/\s/g, '');
                const has = ['1','2','11','22'].every(d => divs.includes(d));
                return [
                  { correct: has, hint: '1, 2, 11, 22' },
                  { correct: num(vals.p8b) === 2, hint: '2 ((-1)²=1)' },
                  { correct: num(vals.p8c) === 11, hint: '11 (2¹¹≡1 mod 23)' },
                  { correct: vals.p8d === 'no', hint: 'no — 7 doesn\'t divide 22' },
                ];
              },
            },
          ],
          explanation: 'Divisors of 22 = {1, 2, 11, 22}. These are the <em>only</em> possible element orders. The element 2 has order 11 (a proper subgroup), while 5 has order 22 (a generator). In cryptography, if you accidentally work in a subgroup of order 11 instead of the full group of order 22, an attacker\'s search space shrinks dramatically. Lagrange tells you exactly which subgroups can exist.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p9',
          label: 'Puzzle 9 — Why Lagrange Matters',
          description: 'Connect Lagrange\'s Theorem back to Fermat and Euler.',
          inputs: [
            {
              fields: [
                { id: 'p9a', label: 'Fermat: aᵖ⁻¹ ≡ 1 mod p. Group order of (ℤ/pℤ)* =', placeholder: '?' },
                { id: 'p9b', label: 'Euler: aᵠ⁽ⁿ⁾ ≡ 1 mod n. Group order of (ℤ/nℤ)* =', placeholder: '?' },
                { id: 'p9c', label: 'Lagrange says: ord(a) divides |G|. So a^|G| ≡ ?', placeholder: '?' },
                { id: 'p9d', label: 'Are Fermat/Euler special cases of Lagrange?', placeholder: 'yes or no' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p9a.includes('p-1') || vals.p9a.includes('p - 1') || num(vals.p9a) === 6, hint: 'p - 1' },
                  { correct: vals.p9b.includes('φ') || vals.p9b.includes('phi') || vals.p9b.includes('totient'), hint: 'φ(n)' },
                  { correct: num(vals.p9c) === 1, hint: '1 — always!' },
                  { correct: vals.p9d === 'yes', hint: 'yes' },
                ];
              },
            },
          ],
          explanation: 'Fermat\'s Little Theorem says a^(p-1) ≡ 1 — but p-1 is just the order of (ℤ/pℤ)*. Euler says a^φ(n) ≡ 1 — but φ(n) is the order of (ℤ/nℤ)*. <strong>Both are special cases of Lagrange\'s Theorem</strong>: if the order of a divides |G|, then a^|G| = (a^ord(a))^(|G|/ord(a)) = 1. One theorem, three names, running inside every RSA decryption and every DH key exchange.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 4: Field Axioms Formalized ──
    {
      id: 'sec4',
      title: '§4 — Field Axioms Formalized',
      shortName: 'Fields',
      puzzles: [
        {
          id: 'p10',
          label: 'Puzzle 10 — Two Groups in One',
          description: 'A field has TWO group structures: addition and multiplication. Explore ℤ/7ℤ.',
          inputs: [
            {
              fields: [
                { id: 'p10a', label: 'Additive group (ℤ/7ℤ, +) order =' },
                { id: 'p10b', label: 'Additive identity =' },
                { id: 'p10c', label: 'Multiplicative group (ℤ/7ℤ)* order =' },
                { id: 'p10d', label: 'Multiplicative identity =' },
                { id: 'p10e', label: 'Additive inverse of 3:' },
                { id: 'p10f', label: 'Multiplicative inverse of 3:' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p10a) === 7, hint: '7 (includes 0)' },
                  { correct: num(vals.p10b) === 0, hint: '0' },
                  { correct: num(vals.p10c) === 6, hint: '6 (excludes 0)' },
                  { correct: num(vals.p10d) === 1, hint: '1' },
                  { correct: num(vals.p10e) === 4, hint: '4 (3+4≡0)' },
                  { correct: num(vals.p10f) === 5, hint: '5 (3×5≡1)' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Why 0 is excluded from ×',
              fields: [
                { id: 'p10g', label: '0 × anything =', placeholder: '?' },
                { id: 'p10h', label: 'Does 0 have a multiplicative inverse?', placeholder: 'yes or no' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p10g) === 0, hint: '0 — always' },
                  { correct: vals.p10h === 'no', hint: 'no — 0×x can never equal 1' },
                ];
              },
            },
          ],
          explanation: 'A <strong>field</strong> is a set with two operations: (S, +) forms a group with identity 0, and (S\\{0}, ×) forms a group with identity 1. The distributive law connects them. ℤ/7ℤ has additive group of order 7 and multiplicative group of order 6. The element 0 is special — it participates in addition but is excluded from multiplication. This two-group structure is exactly what elliptic curve cryptography builds on: the underlying coordinates live in a field.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p11',
          label: 'Puzzle 11 — Fields vs Not-Fields',
          description: 'Classify each as a field or not. A field requires: every nonzero element has a multiplicative inverse.',
          inputs: [
            {
              fields: [
                { id: 'p11a', label: 'ℤ/5ℤ (mod 5):', placeholder: 'field or not' },
                { id: 'p11b', label: 'ℤ/6ℤ (mod 6):', placeholder: 'field or not' },
                { id: 'p11c', label: 'ℤ/2ℤ (mod 2):', placeholder: 'field or not' },
                { id: 'p11d', label: 'Integers ℤ:', placeholder: 'field or not' },
                { id: 'p11e', label: 'Rationals ℚ:', placeholder: 'field or not' },
              ],
              validate(vals) {
                const isField = v => v === 'field' || v === 'yes';
                const notField = v => v === 'not' || v === 'no' || v.includes('not');
                return [
                  { correct: isField(vals.p11a), hint: 'field — 5 is prime' },
                  { correct: notField(vals.p11b), hint: 'not — 2×3≡0 mod 6' },
                  { correct: isField(vals.p11c), hint: 'field — 2 is prime' },
                  { correct: notField(vals.p11d), hint: 'not — 2 has no integer inverse' },
                  { correct: isField(vals.p11e), hint: 'field — every nonzero has inverse' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus',
              fields: [
                { id: 'p11f', label: 'ℤ/nℤ is a field ⟺ n is ...', placeholder: '?', width: '120px' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p11f.includes('prime'), hint: 'prime' },
                ];
              },
            },
          ],
          explanation: 'ℤ/nℤ is a field <strong>if and only if n is prime</strong>. Composite moduli have zero divisors (like 2×3≡0 mod 6), which destroy the multiplicative group structure. The integers fail because 1/2 isn\'t an integer. The rationals work but are infinite. For cryptography, we need <em>finite</em> fields — and finite fields of prime order are exactly the ℤ/pℤ we\'ve been studying. Elliptic curve coordinates live in these fields.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p12',
          label: 'Puzzle 12 — Field Arithmetic in GF(11)',
          description: 'Practice field operations in GF(11) — the same type of field used by secp256k1.',
          inputs: [
            {
              fields: [
                { id: 'p12a', label: '7 + 8 mod 11 =' },
                { id: 'p12b', label: '7 × 8 mod 11 =' },
                { id: 'p12c', label: '3⁻¹ mod 11 = (3×? ≡ 1)' },
                { id: 'p12d', label: '"5 ÷ 3" mod 11 = 5 × 3⁻¹ =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p12a) === 4, hint: '4 (15 mod 11)' },
                  { correct: num(vals.p12b) === 1, hint: '1 (56 mod 11) — so 7⁻¹=8!' },
                  { correct: num(vals.p12c) === 4, hint: '4 (3×4=12≡1)' },
                  { correct: num(vals.p12d) === 9, hint: '9 (5×4=20≡9)' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Verify the "division"',
              fields: [
                { id: 'p12e', label: '3 × 9 mod 11 =', placeholder: '?' },
                { id: 'p12f', label: 'Does it equal 5? (5÷3=9)', placeholder: 'yes or no' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p12e) === 5, hint: '5 (27 mod 11)' },
                  { correct: vals.p12f === 'yes', hint: 'yes — division works!' },
                ];
              },
            },
          ],
          explanation: '"Division" in a finite field is just multiplication by the inverse. 5÷3 = 5×3⁻¹ = 5×4 = 20 ≡ 9 mod 11. Verify: 3×9 = 27 ≡ 5 ✓. This is exactly how elliptic curve point addition works — every slope calculation involves "dividing" by a coordinate difference, which is really multiplying by its modular inverse. <strong>secp256k1 does this same arithmetic in GF(p)</strong> where p is a 256-bit prime.',
          explanationType: 'correct-exp',
        },
      ],
    },

    // ── SECTION 5: Groups in Cryptographic Protocols ──
    {
      id: 'sec5',
      title: '§5 — Groups in Cryptographic Protocols',
      shortName: 'Crypto',
      puzzles: [
        {
          id: 'p13',
          label: 'Puzzle 13 — DH Revisited with Group Theory',
          description: 'Diffie-Hellman in (ℤ/23ℤ)* with generator g=5. Alice picks a=4, Bob picks b=3.',
          inputs: [
            {
              fields: [
                { id: 'p13a', label: 'Alice sends A = 5⁴ mod 23 =' },
                { id: 'p13b', label: 'Bob sends B = 5³ mod 23 =' },
                { id: 'p13c', label: 'Alice: B^a = 10⁴ mod 23 =' },
                { id: 'p13d', label: 'Bob: A^b = 4³ mod 23 =' },
              ],
              validate(vals) {
                // 5^4 mod 23 = 625 mod 23 = 625-27*23 = 625-621 = 4
                // 5^3 mod 23 = 125 mod 23 = 125-5*23 = 125-115 = 10
                // 10^4 mod 23: 10^2=100 mod 23=8, 8^2=64 mod 23=18. So 10^4=18.
                // 4^3 mod 23 = 64 mod 23 = 18.
                return [
                  { correct: num(vals.p13a) === 4, hint: '4 (625 mod 23)' },
                  { correct: num(vals.p13b) === 10, hint: '10 (125 mod 23)' },
                  { correct: num(vals.p13c) === 18, hint: '18 (shared secret!)' },
                  { correct: num(vals.p13d) === 18, hint: '18 (same secret!)' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Why g=5 and not g=2?',
              fields: [
                { id: 'p13e', label: 'Order of g=5 in (ℤ/23ℤ)*:', placeholder: '?' },
                { id: 'p13f', label: 'Order of g=2 in (ℤ/23ℤ)*:', placeholder: '?' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p13e) === 22, hint: '22 — full group' },
                  { correct: num(vals.p13f) === 11, hint: '11 — only half!' },
                ];
              },
            },
          ],
          explanation: 'Both compute the same shared secret: 5^(a×b) mod 23 = 5^12 mod 23 = 18. In group theory terms, DH works because exponentiation is a <strong>group homomorphism</strong>: (g^a)^b = g^(ab) = (g^b)^a. The generator g=5 has order 22 (full group), while g=2 has order 11 (subgroup). Using g=5 is critical for security.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p14',
          label: 'Puzzle 14 — Subgroup Attacks',
          description: 'Compare the security of g=5 (order 22) vs g=2 (order 11) in (ℤ/23ℤ)*.',
          inputs: [
            {
              fields: [
                { id: 'p14a', label: 'With g=5: how many possible secrets?', placeholder: '?' },
                { id: 'p14b', label: 'With g=2: how many possible secrets?', placeholder: '?' },
                { id: 'p14c', label: 'Security reduction factor:', placeholder: '?' },
                { id: 'p14d', label: '2¹¹ mod 23 =' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p14a) === 22, hint: '22' },
                  { correct: num(vals.p14b) === 11, hint: '11 — half the search space' },
                  { correct: num(vals.p14c) === 2, hint: '2× easier to break' },
                  { correct: num(vals.p14d) === 1, hint: '1 — 2 has order 11' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Detecting the subgroup',
              fields: [
                { id: 'p14e', label: 'If A = g^a with g=2, is A¹¹ ≡ 1?', placeholder: 'yes or no' },
                { id: 'p14f', label: 'Can an attacker detect you\'re in the subgroup?', placeholder: 'yes or no' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p14e === 'yes', hint: 'yes — always, for any a' },
                  { correct: vals.p14f === 'yes', hint: 'yes — just check if A¹¹≡1' },
                ];
              },
            },
          ],
          explanation: 'With g=2 (order 11), every public value A = 2^a satisfies A¹¹ ≡ 1 mod 23. An attacker can verify this, confirming the shared secret lives in a subgroup of size 11 instead of 22. Brute force is 2× easier. With real-world parameters, a subgroup of order q in a group of order p-1 reduces security from log₂(p-1) bits to log₂(q) bits. This is why <strong>safe primes</strong> (where p-1 = 2q, q prime) are preferred — they minimize subgroup risk.',
          explanationType: 'correct-exp',
        },
        {
          id: 'p15',
          label: 'Puzzle 15 — Bridge to Elliptic Curves',
          description: 'Compare (ℤ/pℤ)* and elliptic curves side by side. Same structure, different operation.',
          inputs: [
            {
              fields: [
                { id: 'p15a', label: '(ℤ/pℤ)* operation:', placeholder: '?', width: '180px' },
                { id: 'p15b', label: 'EC group operation:', placeholder: '?', width: '180px' },
                { id: 'p15c', label: '(ℤ/pℤ)* identity element:', placeholder: '?' },
                { id: 'p15d', label: 'EC identity element:', placeholder: '?' },
                { id: 'p15e', label: '(ℤ/pℤ)* DLP: find x in g^x', placeholder: 'easy or hard' },
                { id: 'p15f', label: 'EC DLP: find k in kG', placeholder: 'easy or hard' },
              ],
              validate(vals) {
                return [
                  { correct: vals.p15a.includes('mult') || vals.p15a === '×' || vals.p15a === '*', hint: 'multiplication' },
                  { correct: vals.p15b.includes('add') || vals.p15b === '+' || vals.p15b.includes('point'), hint: 'point addition' },
                  { correct: num(vals.p15c) === 1 || vals.p15c === '1', hint: '1' },
                  { correct: vals.p15d === 'O' || vals.p15d.includes('infinity') || vals.p15d === '∞' || vals.p15d === 'o', hint: 'O (point at infinity)' },
                  { correct: vals.p15e === 'hard', hint: 'hard' },
                  { correct: vals.p15f === 'hard', hint: 'hard' },
                ];
              },
            },
            {
              bonusBox: true,
              bonusLabel: 'Bonus: Why EC wins',
              fields: [
                { id: 'p15g', label: 'For 128-bit security, DH needs ? bits:', placeholder: '?' },
                { id: 'p15h', label: 'For 128-bit security, EC needs ? bits:', placeholder: '?' },
              ],
              validate(vals) {
                return [
                  { correct: num(vals.p15g) === 3072, hint: '3072' },
                  { correct: num(vals.p15h) === 256, hint: '256 — 12× smaller keys!' },
                ];
              },
            },
          ],
          explanation: 'Both (ℤ/pℤ)* and elliptic curves are <strong>cyclic groups with hard discrete log problems</strong>. The group axioms are identical — closure, associativity, identity, inverses. The operation changes: multiplication → point addition. Identity changes: 1 → O. But the critical difference is security per bit: the best attack on EC DLP is O(√n) via Pollard\'s rho (fully exponential), while the best attack on modular DLP is sub-exponential (number field sieve). This means <strong>256-bit EC keys = 3072-bit DH keys</strong> for the same 128-bit security level. This is why Ethereum uses secp256k1.',
          explanationType: 'correct-exp',
        },
      ],
    },
  ],
};
