import { SUDOKU_API } from './sudoku.api.token';
import { SudokuApiService } from './sudoku.api.service';

export const SUDOKU_API_PROVIDER = {
  provide: SUDOKU_API,
  useExisting: SudokuApiService,
};
