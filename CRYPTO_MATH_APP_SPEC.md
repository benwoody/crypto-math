# Crypto Math Workshop — Local App Spec

## What This Is

A local web app for working through a self-paced cryptography math curriculum. The user reads lessons and solves problems in the browser at `localhost`. No accounts, no backend, no deployment. Just a dev server on their machine.

## Tech Stack

Keep it simple:
- **Vite** with vanilla JS/HTML (no React, no framework)
- **Markdown rendering** via `marked` or `markdown-it` for lesson content
- **Local storage** for saving progress
- CSS — clean, dark theme, monospace for math, readable

## Structure

```
crypto-math/
├── package.json
├── vite.config.js
├── index.html              ← entry point, module list
├── src/
│   ├── main.js             ← router, app shell
│   ├── styles.css           ← global styles
│   ├── progress.js          ← localStorage read/write for scores
│   └── checker.js           ← shared answer-checking utilities
├── modules/
│   ├── module-00-foundations/
│   │   ├── lesson.md        ← lesson content (rendered in browser)
│   │   ├── exercises.js     ← puzzle definitions, answers, explanations
│   │   └── visualizers.js   ← interactive visual tools (mod clock, etc)
│   ├── module-01-modular-arithmetic/
│   │   ├── lesson.md
│   │   ├── exercises.js
│   │   └── visualizers.js
│   └── ...future modules same pattern
└── README.md
```

## How It Works

### Landing Page (`localhost:5173`)
- Title: "Crypto Math Workshop"
- Subtitle: "Built for Thurin. Not a textbook. A workshop."
- Grid of module cards showing:
  - Module number and name
  - Brief description
  - Progress indicator (e.g., "4/7 puzzles correct", or "not started")
  - Visual state: locked (future), available, in-progress, completed
- Only Module 0 exists right now. Future modules show as "coming soon" placeholders.

### Module Page (`localhost:5173/module/00`)
- Two-panel or tabbed layout:
  - **Lesson tab**: The rendered markdown lesson. Just text. Readable, scrollable.
  - **Solve tab**: The interactive checker with all puzzles, input fields, check buttons, feedback, and explanations.
- Visualizers (like the mod slider) are embedded in the Solve tab where relevant.
- A progress summary at the bottom showing section scores.
- "Back to modules" link.

### Exercise File Format (`exercises.js`)

Each module's exercises.js exports an array of sections, each containing puzzles:

```js
export default {
  title: "Module 0: Foundations",
  sections: [
    {
      id: "sec1",
      title: "Numbers and Their Personalities",
      puzzles: [
        {
          id: "p1",
          label: "Puzzle 1 — Negative Division",
          description: "Give the quotient and remainder for each.",
          inputs: [
            {
              id: "p1a",
              label: "17 ÷ 5 → Q, R",
              fields: [
                { id: "p1a_q", placeholder: "quotient", width: "80px" },
                { id: "p1a_r", placeholder: "remainder", width: "80px" }
              ],
              // validate is a function that receives an object of field values
              // and returns { correct: bool, feedback: string }
              validate: (vals) => {
                if (parseFloat(vals.p1a_q) === 3 && parseFloat(vals.p1a_r) === 2)
                  return { correct: true };
                return { correct: false, hint: "3 remainder 2" };
              }
            },
            // ...more inputs
          ],
          explanation: "Negative division has two conventions..."
        }
      ]
    }
  ]
};
```

The checker.js utility reads this format and renders the puzzle UI generically. This means adding a new module is just:
1. Write `lesson.md`
2. Write `exercises.js` following the format
3. Optionally add `visualizers.js`
4. Add the module to a registry/config

### Visualizers

Interactive HTML/JS/Canvas elements embedded in the solve page. Module 0 has one:

- **Mod Visualizer**: Two sliders (number 0-50, modulus 2-16). Shows the result of `number mod modulus`. Displays a number line with highlighted groups showing how the modulus divides the range, and the remainder highlighted distinctly. Updates live as sliders move.

Future modules will have more (elliptic curve point plotter, field arithmetic table, etc). Each is a standalone JS module that mounts into a container div.

### Progress Storage

Use localStorage with a simple schema:

```js
// Key: "crypto-math-progress"
{
  "module-00": {
    "sec1": { correct: 5, total: 7, completedAt: null },
    "sec2": { correct: 3, total: 6, completedAt: null },
    // ...
    "completedAt": null  // set when all sections done
  }
}
```

### Design Guidelines

- **Dark theme**. Background `#0a0a0f` or similar very dark blue-black.
- **Monospace for all math**: JetBrains Mono or Fira Code (via Google Fonts).
- **Body text**: Any clean sans-serif. Outfit, DM Sans, or similar.
- **Accent color**: Purple-blue (`#6c63ff` or similar).
- **Correct answers**: Green highlights.
- **Wrong answers**: Red highlights with hint text.
- **Explanations**: Appear after checking, styled as callout boxes.
- **Minimal UI**. No sidebars, no navbars, no hamburger menus. Just content.
- **Mobile-friendly** but desktop-first (user is solving at a desk).

## Module 0 Content

The lesson content and all puzzle definitions, answers, and explanations are provided in the two companion files:

- `LESSON.md` — the full lesson text for Module 0
- `module-00-checker.html` — contains all puzzle logic, correct answers, validation functions, feedback text, and explanations in working form. Extract the puzzle definitions and answer-checking logic from this HTML file and port them into the `exercises.js` format.

The agent should read both files and use them as the source of truth for Module 0's content.

## How to Add Future Modules

When the user comes back with new module files (a lesson.md and exercises.js), the agent should:

1. Create a new directory under `modules/` (e.g., `module-01-modular-arithmetic/`)
2. Place the files there
3. Register the module in whatever config/registry the app uses
4. The app should automatically pick it up and show it on the landing page

## Commands

```bash
npm install
npm run dev    # starts vite dev server
```

That's it. No build step needed for development. User opens browser, does math, closes browser, progress is saved.
