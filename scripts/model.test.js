// =====================================================================
// model.test.js  -  tests for the Sudoku model. Run with: node --test
// =====================================================================
// These tests describe what the functions in model.js must do. They use
// Node's built-in test runner - no install, no framework. From the repo
// root run `node --test` (or `npm test`) and make every test pass.
// =====================================================================

import { test } from 'node:test'
import assert from 'node:assert/strict'

import {
  EMPTY,
  SAMPLE_BOARD,
  sameRow,
  sameColumn,
  sameBlock,
  getCell,
  setCell,
  findConflicts,
  isComplete,
  formatDuration,
  formatDate,
  sortScores,
} from './model.js'

test('sameRow / sameColumn / sameBlock (provided helpers)', () => {
  assert.equal(sameRow(0, 0, 0, 8), true)
  assert.equal(sameRow(0, 0, 1, 0), false)
  assert.equal(sameColumn(0, 0, 8, 0), true)
  assert.equal(sameColumn(0, 0, 0, 1), false)
  assert.equal(sameBlock(0, 0, 2, 2), true) // same top-left block
  assert.equal(sameBlock(0, 0, 3, 3), false) // different block
})

test('getCell reads filled and empty cells', () => {
  assert.equal(getCell(SAMPLE_BOARD, 0, 1), 1)
  assert.equal(getCell(SAMPLE_BOARD, 0, 0), EMPTY)
})

test('setCell sets a value without mutating the original', () => {
  const after = setCell(SAMPLE_BOARD, 0, 0, 5)
  assert.equal(getCell(after, 0, 0), 5)
  assert.equal(getCell(SAMPLE_BOARD, 0, 0), EMPTY) // original untouched
  assert.notEqual(after, SAMPLE_BOARD) // a new board
})

test('findConflicts finds a same-row duplicate', () => {
  const board = setCell(SAMPLE_BOARD, 0, 0, 9) // a 9 sharing row 0 with the 9 at (0,7)
  const conflicts = findConflicts(board, 0, 0)
  assert.deepEqual(conflicts, [[0, 7]])
})

test('findConflicts finds a same-column duplicate', () => {
  const board = setCell(SAMPLE_BOARD, 3, 1, 1) // a 1 sharing column 1 with the 1 at (0,1)
  const conflicts = findConflicts(board, 3, 1)
  assert.deepEqual(conflicts, [[0, 1]])
})

test('findConflicts finds a same-block duplicate', () => {
  const board = setCell(SAMPLE_BOARD, 1, 0, 1) // a 1 in the same block as (0,1)
  const conflicts = findConflicts(board, 1, 0)
  assert.deepEqual(conflicts, [[0, 1]])
})

test('an empty cell has no conflicts', () => {
  assert.deepEqual(findConflicts(SAMPLE_BOARD, 0, 0), [])
})

test('a unique digit has no conflicts', () => {
  const board = setCell(SAMPLE_BOARD, 0, 0, 7)
  assert.deepEqual(findConflicts(board, 0, 0), [])
})

test('isComplete is false for the starting puzzle', () => {
  assert.equal(isComplete(SAMPLE_BOARD), false)
})

test('isComplete is true for a fully solved board', () => {
  assert.equal(isComplete(SOLVED_BOARD), true)
})

test('isComplete is false when a full board has a conflict', () => {
  const broken = setCell(SOLVED_BOARD, 0, 0, getCell(SOLVED_BOARD, 0, 1))
  assert.equal(isComplete(broken), false)
})

test('formatDuration formats m:ss', () => {
  assert.equal(formatDuration(171), '2:51')
  assert.equal(formatDuration(41), '0:41')
  assert.equal(formatDuration(60), '1:00')
})

test('formatDate zero-pads to YYYY/MM/DD', () => {
  assert.equal(formatDate(new Date(2021, 2, 2)), '2021/03/02')
  assert.equal(formatDate(new Date(2021, 10, 17)), '2021/11/17')
})

test('sortScores returns a new array sorted fastest-first', () => {
  const input = [
    { date: new Date(2021, 0, 1), durationSeconds: 240 },
    { date: new Date(2021, 0, 2), durationSeconds: 171 },
    { date: new Date(2021, 0, 3), durationSeconds: 188 },
  ]
  const sorted = sortScores(input)
  assert.deepEqual(sorted.map((s) => s.durationSeconds), [171, 188, 240])
  assert.equal(input[0].durationSeconds, 240) // input untouched
})

// A valid, fully-solved board used by the isComplete tests.
const SOLVED_BOARD = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
]
