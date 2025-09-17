import { Injectable, signal } from '@angular/core';
import { Board } from '../models/board';

type Status = 'idle' | 'loading' | 'playing' | 'solved' | 'error';
type Loading = 'generate' | 'solve' | 'validate';

@Injectable({ providedIn: 'root' })
export class GameState {
  readonly board = signal<Board>([]);
  readonly fixedMask = signal<boolean[][]>([]);
  readonly status = signal<Status>('idle');
  readonly loading = signal<{
    generate: boolean;
    validate: boolean;
    solve: boolean;
  }>({
    generate: false,
    validate: false,
    solve: false,
  });
  readonly error = signal<string | null>(null);
  readonly selection = signal<{ row: number; col: number } | null>(null);

  applyNewBoard(board: Board) {
    this.board.set(board);
    this.fixedMask.set(board.map((row) => row.map((value) => value !== 0)));
    this.status.set('playing');
    this.error.set(null);
    this.loading.set({ generate: false, validate: false, solve: false });
  }

  setCell(pos: { row: number; col: number }, value: number) {
    const mask = this.fixedMask();

    if (!mask.length || mask[pos.row][pos.col]) {
      return;
    }

    const currentBoard = this.board();
    const nextRow = [...currentBoard[pos.row]];
    nextRow[pos.col] = value;

    const nextBoard = [...currentBoard];
    nextBoard[pos.row] = nextRow;

    this.board.set(nextBoard);
  }

  clearCell(pos: { row: number; col: number }) {
    this.setCell(pos, 0);
  }

  setSelection(pos: { row: number; col: number } | null) {
    this.selection.set(pos);
  }

  setLoading(scope: Loading, flag: boolean) {
    const current = this.loading();

    this.loading.set({ ...current, [scope]: flag });
  }

  setStatus(status: Status) {
    this.status.set(status);
  }

  setError(message: string | null) {
    this.error.set(message);

    if (message) {
      this.status.set('error');
    } else if (this.status() === 'error') {
      this.status.set('playing');
    }
  }

  markSolved() {
    this.status.set('solved');
    this.error.set(null);
  }
}
