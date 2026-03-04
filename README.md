# Crypto Math for Engineers

A hands-on math workshop for engineers building on Ethereum. Not a textbook. Not a course. A workshop.

Work through interactive lessons and puzzles that build the mathematical foundations behind elliptic curve cryptography, digital signatures, and smart contract arithmetic — starting from what you already know as an engineer.

## Modules

| Module | Topic | Status |
|--------|-------|--------|
| 0 | **Where Are You?** — Foundation check across numbers, mod, exponents, binary/hex | ✅ 6 sections, 17 puzzles |
| 1 | **Modular Arithmetic** — GCD, inverses, Fermat/Euler, prime fields, RSA & DH | ✅ 5 sections, 15 puzzles |
| 2 | **Groups & Fields** — Group axioms, generators, Lagrange, field classification | ✅ 5 sections, 15 puzzles |
| 3 | **Elliptic Curves** — Point addition, scalar multiplication, ECDLP, ECDSA | ✅ 5 sections, 15 puzzles |

## Getting Started

```
npm install
npm run dev
```

Open `http://localhost:5173`.

## How It Works

Each module has two tabs:

- **Lesson** — Read through the concepts with crypto/Ethereum context
- **Solve** — Work through puzzles, get instant feedback, see explanations

Progress saves to localStorage automatically. Section badges show your score: solid (100%), mostly good (60%+), or review (below 60%).

## Pair with an AI

This workshop works well as a conversation. Open a [Claude Code](https://docs.anthropic.com/en/docs/claude-code) session in the repo and work through the puzzles together — the agent can see the lesson content and exercises, walk you through the math step by step, check your reasoning, and explain things differently when you're stuck. It turns a solo worksheet into something closer to office hours.

## Project Structure

```
src/
  main.js          # Hash router
  styles.css       # Global styles (dark theme)
  modules.js       # Module registry
  progress.js      # localStorage persistence
  checker.js       # Generic puzzle renderer
  pages/
    home.js        # Landing page with module cards
    module.js      # Lesson/Solve tab layout
modules/
  module-00-foundations/
    lesson.md      # Lesson content
    exercises.js   # Puzzles with validation logic
    visualizers.js # Interactive visualizer
  module-01-modular-arithmetic/
  module-02-groups-fields/
  module-03-elliptic-curves/
public/
  modules/         # Static copies of lesson.md files
```

Adding a new module: create a folder under `modules/`, add `lesson.md`, `exercises.js`, and `visualizers.js`, copy `lesson.md` to `public/modules/`, then register it in `src/modules.js`.

## Tech

- [Vite](https://vite.dev) — dev server and build
- [marked](https://marked.js.org) — markdown rendering
- Vanilla JS — no framework
- localStorage — progress persistence

## License

MIT
