import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SudokuCell } from '../sudoku-cell/sudoku-cell';

@Component({
  selector: 'app-sudoku-table',
  imports: [SudokuCell],
  templateUrl: './sudoku-table.html',
  styleUrl: './sudoku-table.scss',
})
export class SudokuTable {
  @Input() config!: {
    readonly board?: Array<Array<number>>;
    readonly selection?: { row: number; col: number } | null;
    readonly fixedMask: boolean[][];
    readonly disabled: boolean;
    readonly loading: boolean;
  };

  @Output() cellInput = new EventEmitter<{
    row: number;
    col: number;
    value: number;
  }>();
  @Output() cellClear = new EventEmitter<{ row: number; col: number }>();
  @Output() cellSelect = new EventEmitter<{
    row: number;
    col: number;
  } | null>();

  onCellInput(value: number, row: number, col: number) {
    this.cellInput.emit({ row, col, value });
  }

  onCellClear(row: number, col: number) {
    this.cellClear.emit({ row, col });
  }

  onCellSelect(row: number, col: number) {
    this.cellSelect.emit({ row, col });
  }

  onCellBlur() {
    this.cellSelect.emit(null);
  }
}
