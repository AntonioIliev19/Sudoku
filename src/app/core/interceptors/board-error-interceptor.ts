import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { GameState } from '../../features/sudoku/data-access/state/game.state';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { GameStatus } from '../../features/sudoku/data-access/models/game-status';

export const boardErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const state = inject(GameState);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      state.setStatus(GameStatus.Error);

      if (req.url.includes('/board')) {
        state.setError("Couldn't load a board. Please try again.");
      } else if (req.url.includes('/validate')) {
        state.setError("Couldn't validate the board. Please try again.");
      } else if (req.url.includes('/solve')) {
        state.setError("Couldn't solve the board. Please try again.");
      } else {
        state.setError('An unexpected error occurred. Please try again.');
      }

      return throwError(() => error);
    }),
  );
};
