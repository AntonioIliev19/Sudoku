import { Board } from '../data-access/models/board';

export function isEmpty(value: number): boolean {
  return value === 0;
}

export function isInRange(value: number): boolean {
  return value >= 1 && value <= 9;
}

export function rowHasConflict(board: Board, row: number): boolean {
  const seen = new Set<number>();

  for (const val of board[row]) {
    if (val !== 0) {
      if (seen.has(val)) return true;

      seen.add(val);
    }
  }

  return false;
}
