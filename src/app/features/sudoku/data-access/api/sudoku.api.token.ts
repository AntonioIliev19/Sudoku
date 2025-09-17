import { InjectionToken } from '@angular/core';
import { SudokuApi } from './sudoku.api';

export const SUDOKU_API = new InjectionToken<SudokuApi>('SudokuApi');
