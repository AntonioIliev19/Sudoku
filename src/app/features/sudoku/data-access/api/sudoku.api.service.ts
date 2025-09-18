import { inject, Injectable } from '@angular/core';
import { SudokuApi } from './sudoku.api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';
import { encodeParams } from '../../utils/encode';
import { BoardResponse } from '../models/board-response';
import { Difficulty } from '../models/difficulty';
import { Board } from '../models/board';
import { ValidateResponse } from '../models/validate-response';
import { SolveResponse } from '../models/solve-response';

@Injectable({
  providedIn: 'root',
})
export class SudokuApiService implements SudokuApi {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  getBoard(difficulty: Difficulty): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(`${this.baseUrl}/board`, {
      params: { difficulty },
    });
  }

  validateBoard(board: Board): Observable<ValidateResponse> {
    return this.http.post<ValidateResponse>(
      `${this.baseUrl}/validate`,
      encodeParams({ board }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
  }

  solveBoard(board: Board): Observable<SolveResponse> {
    return this.http.post<SolveResponse>(
      `${this.baseUrl}/solve`,
      encodeParams({ board }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
  }
}
