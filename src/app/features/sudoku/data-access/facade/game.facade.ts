import { DestroyRef, inject, Injectable } from '@angular/core';
import { SUDOKU_API } from '../api/sudoku.api.token';
import { GameState } from '../state/game.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Difficulty } from '../models/difficulty';
import { BoardResponse } from '../models/board-response';
import { ValidateResponse } from '../models/validate-response';
import { SolveResponse } from '../models/solve-response';

@Injectable({ providedIn: 'root' })
export class GameFacade {
  private readonly api = inject(SUDOKU_API);
  private readonly state = inject(GameState);
  private readonly destroyRef = inject(DestroyRef);

  readonly board = this.state.board.asReadonly();
  readonly status = this.state.status.asReadonly();
  readonly loading = this.state.loading.asReadonly();
  readonly error = this.state.error.asReadonly();
  readonly selection = this.state.selection.asReadonly();
  readonly fixedMask = this.state.fixedMask.asReadonly();

  newGame(difficulty: Difficulty) {
    if (this.loading().generate) return;

    this.state.setError(null);
    this.state.setStatus('loading');
    this.state.setLoading('generate', true);
    this.state.setSelection(null);

    this.api
      .getBoard(difficulty)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.state.setLoading('generate', false)),
      )
      .subscribe({
        next: (response: BoardResponse) => {
          this.state.applyNewBoard(response.board);
          this.state.setStatus('playing');
        },
        error: () => {
          this.state.setStatus('error');
          this.state.setError("Couldn't load a board. Please try again.");
        },
      });
  }

  validateBoard() {
    if (this.loading().validate) return;

    this.state.setError(null);
    this.state.setLoading('validate', true);
    this.state.setStatus('playing');

    const board = this.board();

    this.api
      .validateBoard(board)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.state.setLoading('validate', false)),
      )
      .subscribe({
        next: (response: ValidateResponse) => {
          switch (response.status) {
            case 'solved':
              this.state.markSolved();
              return;
            case 'broken':
              this.state.setStatus('playing');
              this.state.setError('The board is broken.');
              return;
          }
        },
        error: () => {
          this.state.setStatus('error');
          this.state.setError("Couldn't validate the board. Please try again.");
        },
      });
  }

  solveBoard() {
    if (this.loading().solve) return;

    this.state.setError(null);
    this.state.setLoading('solve', true);
    this.state.setStatus('playing');
    this.state.setSelection(null);

    const board = this.board();

    this.api
      .solveBoard(board)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.state.setLoading('solve', false)),
      )
      .subscribe({
        next: (response: SolveResponse) => {
          switch (response.status) {
            case 'unsolvable':
              this.state.setStatus('playing');
              this.state.setError('The board is unsolvable.');
              return;
            case 'solved':
              this.state.applyNewBoard(response.solution);
              this.state.markSolved();
              return;
          }
        },
        error: () => {
          this.state.setStatus('error');
          this.state.setError("Couldn't solve the board. Please try again.");
        },
      });
  }

  setCell(pos: { row: number; col: number }, value: number) {
    this.state.setCell(pos, value);

    if (this.state.error()) {
      this.state.setError(null);
    }
  }

  clearCell(pos: { row: number; col: number }) {
    this.state.clearCell(pos);
  }

  setSelection(pos: { row: number; col: number } | null) {
    this.state.setSelection(pos);
  }
}
