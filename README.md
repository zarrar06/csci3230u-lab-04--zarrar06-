# Lab 04 - JavaScript: the Sudoku model & logic

The second of three labs building the **Sudoku** app:

| Lab | You add | Topic |
|-----|---------|-------|
| 02 | HTML + CSS | structure + style |
| 04 | **JavaScript** | game logic + tests (pure functions) |
| 05 | DOM + tooling | wiring the model to the page, making it playable |

This week you write the game's brain - the rules of Sudoku - as pure JavaScript: functions that take data in and return data out, with no DOM (`document`/`window`) at all. Pure logic is exactly the kind of thing that's easy to test, so this lab is test-driven: a test suite is provided, and your job is to make it pass.

> **Where's my page?** This lab is purely `scripts/model.js` + the tests - you don't need the HTML this week. Keep your Lab 02 `index.html` / `styles/` handy; **Lab 05** wires this model into the page.

## What you'll build

`scripts/model.js` - a small library of pure functions that represent and reason about a Sudoku board:

- a board is a 9×9 grid (an array of 9 rows, each an array of 9 integers);
- **`EMPTY` (-1)** marks a blank cell; coordinates are `(row, col)`, 0-based.

Your task is to make all of `scripts/model.test.js` pass.

## Getting your copy of the starter repo

The starter for this lab is a **template repository** on GitHub (the link is on Canvas). Make your own copy of it - work in *your* copy, never in the template:

1. Open the template repo and click **Use this template → Create a new repository**.
2. Name it `csci3230u-lab-04-<your-github-username>`, set the visibility to **Private**, and create it.
3. Add your **lab instructor (TA)** and the **course instructor** as collaborators (**Settings → Collaborators and teams → Add people**) - your work cannot be marked if they cannot see it.
4. Clone your new copy and work there:

   ```bash
   git clone <your-repo-url>
   cd <your-repo-dir>
   ```

## The starter repo

| File | Purpose |
|------|---------|
| `scripts/model.js` | the functions to implement - `EMPTY`, `SAMPLE_BOARD`, and the three `same*` helpers are **done**; the rest are stubs marked `TODO` |
| `scripts/model.test.js` | the **tests** - they describe exactly what each function must do. **Don't edit them**; make them pass |
| `package.json` | defines `npm test` (Node's built-in test runner - no install) |

## How to run the tests

From the repo root:

```bash
# runs node --test on every *.test.js
npm test
```

You'll start at `1 passing, 13 failing` (only the `provided-helpers` test passes). Implement the functions one at a time to fix each, one by one. Tip: `node --test --watch` re-runs as you save.

## Requirements - implement these in `model.js`

Each maps to tests in `model.test.js`. The three `same*` helpers are already written for you; use them.

1. **`getCell(board, row, col)`** - return the value at that cell (a digit 1–9, or `EMPTY`).
2. **`setCell(board, row, col, value)`** - return a new board with one cell changed, without mutating the board passed in. This immutability is what makes "undo" trivial in Lab 05 - keep each board, step back through them. Hint: `board.map(...)`.
3. **`findConflicts(board, row, col)`** - return an array of `[row, col]` pairs that conflict with the digit at `(row, col)`: same digit, sharing the row, column, or 3×3 block. A cell never conflicts with itself; an `EMPTY` target has no conflicts. Use `sameRow` / `sameColumn` / `sameBlock`.
4. **`isComplete(board)`** - `true` only when every cell is filled and nothing conflicts.
5. **`formatDuration(seconds)`** - `"m:ss"` (e.g. `171 → "2:51"`, `41 → "0:41"`). Hint: `String(n).padStart(2, "0")`.
6. **`formatDate(date)`** - `"YYYY/MM/DD"` from a `Date` (months/days zero-padded).
7. **`sortScores(scores)`** - a new array of `{ date, durationSeconds }` sorted fastest-first, leaving the input untouched. Hint: `[...scores].sort(...)`.

## Quality bar (this is graded)

- **All 14 tests pass** (`npm test` → `# fail 0`).
- **Pure functions** - no `document`/`window`, no module-level mutable state; same inputs always give the same output.
- **No mutation** - `setCell` and `sortScores` return new values; the originals are unchanged (the tests check this).

## How you're graded

- **Automated:** `node --test` passes every test in `model.test.js`.
- **By rubric:** the functions are genuinely pure (not faked to pass), and `findConflicts` uses the provided helpers rather than re-deriving them.

## How to submit

Show your passed tests to your lab instructor.  Commit and push to `origin` before the deadline. The graded state is whatever is on `main`.

However, since lab marks do sometimes go missing, I would encourage everyone to submit the URL of their repository to Canvas as the submission for this lab assignment (and for all other labs).  If there are any lab mark discrepancies, at least we have your submission to re-mark it.

> **AI policy:** this lab is **hand-coded**. You may ask an AI assistant to *explain* a concept or *interpret* a failing test, but write the logic yourself. (A later lab is explicitly about coding *with* AI tools.) See `project/ai-policy.md`.
