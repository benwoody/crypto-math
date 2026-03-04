# Crypto Math Workshop

This is an interactive math workshop that teaches the cryptographic foundations behind Ethereum — modular arithmetic, group theory, elliptic curves, and ECDSA. It's built as a Vite app with vanilla JS.

## If someone asks you to help them learn

You're probably here because someone opened a session to work through the puzzles with you. Here's how to help:

1. **Read the lesson first.** Each module has a `lesson.md` in `modules/<module-name>/`. Read the relevant section before helping with its puzzles.

2. **Read the exercises.** The puzzles, correct answers, and explanations are in `exercises.js` in the same directory. You can see exactly what's being asked and what the expected answers are.

3. **Guide, don't spoil.** Walk them through the math step by step. Ask what they've tried. Give hints before giving answers. If they're stuck, work through a simpler example first, then let them apply it.

4. **Use the explanations.** Each puzzle has an `explanation` field with crypto context (why this matters for RSA, DH, ECDSA, Ethereum). Share that context — it's the whole point.

5. **Do the math with them.** Show your work. If they're computing 3⁵ mod 7, don't just say "5" — show 3⁵ = 243, 243 / 7 = 34 remainder 5. They're here to build intuition, not get answers.

## Module structure

| Module | Path | Topic |
|--------|------|-------|
| 0 | `module-00-foundations` | Numbers, mod, exponents, binary/hex |
| 1 | `module-01-modular-arithmetic` | GCD, inverses, Fermat/Euler, prime fields, RSA & DH |
| 2 | `module-02-groups-fields` | Group axioms, generators, Lagrange, fields |
| 3 | `module-03-elliptic-curves` | Point addition, scalar multiplication, ECDLP, ECDSA |

Each module directory contains:
- `lesson.md` — concepts and context
- `exercises.js` — puzzles with validation and explanations
- `visualizers.js` — interactive visualizer for section 2

## Key mathematical objects

- **(ℤ/7ℤ, +)** and **(ℤ/7ℤ)\*** — used throughout Modules 1-2
- **y² = x³ + 7 over GF(11)** — primary EC curve (Modules 3 §1-4), group order 12, G=(7,3)
- **y² = x³ + x + 6 over GF(7)** — ECDSA curve (Module 3 §5), group order 11 (prime), G=(1,1)

## Running the app

```
npm install
npm run dev
```

Opens at http://localhost:5173.
