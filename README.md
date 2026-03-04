# Crypto Math for Engineers

A hands-on math workshop for engineers building on Ethereum. Not a textbook. Not a course. A workshop.

Work through interactive lessons and puzzles that build the mathematical foundations behind elliptic curve cryptography, digital signatures, and smart contract arithmetic — starting from what you already know as an engineer.

## Modules

| Module | Topic | Status |
|--------|-------|--------|
| 0 | **Where Are You?** — Foundation check across numbers, mod, exponents, binary/hex | Available |
| 1 | **Modular Arithmetic** — Inverses, primes, and finite fields | Coming soon |
| 2 | **Groups & Fields** — Algebraic structures for cryptography | Coming soon |
| 3 | **Elliptic Curves** — Points on curves, ECDSA, Ethereum signatures | Coming soon |

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
    exercises.js   # 17 puzzles with validation logic
    visualizers.js # Interactive mod visualizer
```

Adding a new module: create a folder under `modules/`, add `lesson.md`, `exercises.js`, and `visualizers.js`, then register it in `src/modules.js`.

## Tech

- [Vite](https://vite.dev) — dev server and build
- [marked](https://marked.js.org) — markdown rendering
- Vanilla JS — no framework
- localStorage — progress persistence

## License

MIT
