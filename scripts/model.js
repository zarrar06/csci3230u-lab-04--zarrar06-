// =====================================================================
// model.js  -  the Sudoku game logic
// =====================================================================
// Pure JavaScript: no `document`, no `window`, no DOM. Every function
// takes data in and returns data out, which makes the logic easy to TEST
// (model.test.js) and, later, easy to drive from the page (Lab 05).
//
// A BOARD is a 9x9 grid: an array of 9 rows, each an array of 9 ints.
// EMPTY (-1) marks a blank cell. Coordinates are (row, col), 0-based.
//
// Fill in every function marked TODO so that `npm test` (node --test)
// passes all of model.test.js. The three helpers are done for you.
// =====================================================================

export const EMPTY = -1

// A sample starting puzzle (matches the board on your Lab 02 page).
export const SAMPLE_BOARD = [
  [EMPTY, 1, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, 9, EMPTY],
  [EMPTY, EMPTY, 4, EMPTY, EMPTY, EMPTY, 2, EMPTY, EMPTY],
  [EMPTY, EMPTY, 8, EMPTY, EMPTY, 5, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, 3, EMPTY],
  [2, EMPTY, EMPTY, EMPTY, 4, EMPTY, 1, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, 1, 8, EMPTY, EMPTY, 6, EMPTY, EMPTY],
  [EMPTY, 3, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, 8, EMPTY],
  [EMPTY, EMPTY, 6, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
]

// ---------------------------------------------------------------------
// Provided helpers (done for you). Two cells are given as (row, col).
// ---------------------------------------------------------------------

/** True if the two cells are in the same row. */
export function sameRow(r1, c1, r2, c2) {
  return r1 === r2
}

/** True if the two cells are in the same column. */
export function sameColumn(r1, c1, r2, c2) {
  return c1 === c2
}

/** True if the two cells are in the same 3x3 block. */
export function sameBlock(r1, c1, r2, c2) {
  const firstRow = Math.floor(r1 / 3) * 3
  const firstCol = Math.floor(c1 / 3) * 3
  return r2 >= firstRow && r2 <= firstRow + 2 && c2 >= firstCol && c2 <= firstCol + 2
}

// ---------------------------------------------------------------------
// Game logic - YOUR CODE.
// ---------------------------------------------------------------------

/** Read the value at (row, col): a digit 1-9, or EMPTY (-1). */
export function getCell(board, row, col) {
  // TODO: return the value stored at board[row][col]
}

/**
 * Return a NEW board with (row, col) set to `value`, WITHOUT mutating the
 * board you were given. (Immutability is what makes "undo" easy in Lab 05.)
 * Hint: `board.map(...)` builds a new array - map the target row, and inside
 * that row map the target column.
 */
export function setCell(board, row, col, value) {
  // TODO: return a new 9x9 board with exactly one cell changed
}

/**
 * Every cell that conflicts with the digit at (row, col): a cell holding the
 * SAME digit that shares the row, column, or 3x3 block. A cell never
 * conflicts with itself, and an EMPTY target has no conflicts.
 * @returns {Array<[number, number]>} list of [row, col] pairs
 * Hint: scan every cell; skip the target itself and any cell whose value
 * differs; keep the ones that share a row/column/block (the helpers above).
 */
export function findConflicts(board, row, col) {
  // TODO: return an array of [row, col] pairs that conflict with (row, col)
}

/** True when every cell is filled (no EMPTY) and nothing conflicts. */
export function isComplete(board) {
  // TODO: false if any cell is EMPTY or has conflicts; otherwise true
}

// ---------------------------------------------------------------------
// High-scores utilities (also pure) - YOUR CODE.
// A score is { date: Date, durationSeconds: number }.
// ---------------------------------------------------------------------

/** Format seconds as "m:ss" (e.g. 171 -> "2:51"). */
export function formatDuration(durationSeconds) {
  // TODO: whole minutes, then zero-padded seconds.
  // Hint: String(n).padStart(2, '0')
}

/** Format a Date as "YYYY/MM/DD" (e.g. "2021/03/02"). */
export function formatDate(date) {
  // TODO: getFullYear(), getMonth() + 1, getDate() - month/day zero-padded
}

/** A NEW array of scores sorted fastest-first, without mutating the input. */
export function sortScores(scores) {
  // TODO: copy the array, then sort by durationSeconds ascending.
  // Hint: [...scores] makes a copy so the original is left untouched.
}
