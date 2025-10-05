import { DestroyRef, inject, Injectable } from '@angular/core';
import { SUDOKU_API } from '../api/sudoku.api.token';
import { GameState } from '../state/game.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Difficulty } from '../models/difficulty';
import { BoardResponse } from '../models/board-response';
import { ValidateResponse } from '../models/validate-response';
import { SolveResponse } from '../models/solve-response';
import { GameStatus } from '../models/game-status';

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
  readonly level = this.state.level.asReadonly();

  newGame(difficulty: Difficulty) {
    if (this.loading().generate) return;

    this.state.setError(null);
    this.state.setStatus(GameStatus.Loading);
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
          this.state.applyNewBoard(response.board, difficulty);
          this.state.setStatus(GameStatus.Unsolved);
        },
      });
  }

  validateBoard() {
    if (this.loading().validate) return;

    this.state.setError(null);
    this.state.setLoading('validate', true);
    this.state.setStatus(GameStatus.Loading);

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
            case GameStatus.Solved:
              this.state.markSolved();
              return;
            case GameStatus.Unsolved:
              this.state.setStatus(GameStatus.Unsolved);
              return;
            case GameStatus.Broken:
              this.state.setStatus(GameStatus.Broken);
          }
        },
      });
  }

  solveBoard() {
    if (this.loading().solve) return;

    this.state.setError(null);
    this.state.setLoading('solve', true);
    this.state.setStatus(GameStatus.Loading);
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
            case GameStatus.Unsolvable:
              this.state.setStatus(GameStatus.Unsolvable);
              this.state.setError('The board is unsolvable.');
              return;
            case GameStatus.Solved:
              this.state.applyNewBoard(response.solution, response.difficulty);
              this.state.markSolved();
              return;
          }
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
