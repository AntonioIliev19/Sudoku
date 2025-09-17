import { Observable } from 'rxjs';
import { Difficulty } from '../models/difficulty';
import { BoardResponse } from '../models/board-response';
import { Board } from '../models/board';
import { ValidateResponse } from '../models/validate-response';
import { SolveResponse } from '../models/solve-response';

export interface SudokuApi {
  getBoard(difficulty: Difficulty): Observable<BoardResponse>;
  validateBoard(board: Board): Observable<ValidateResponse>;
  solveBoard(board: Board): Observable<SolveResponse>;
}
