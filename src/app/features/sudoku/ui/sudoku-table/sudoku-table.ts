import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { isInRange } from '../../utils/rules';

@Component({
  selector: 'app-sudoku-table',
  imports: [NgClass],
  templateUrl: './sudoku-table.html',
  styleUrl: './sudoku-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  onInput(event: Event, row: number, col: number) {
    const input = (event.target as HTMLInputElement).value;
    const value = parseInt(input, 10);

    if (isNaN(value)) {
      this.cellClear.emit({ row, col });
    } else if (isInRange(value)) {
      this.cellInput.emit({ row, col, value });
    } else {
      (event.target as HTMLInputElement).value = '';
      this.cellClear.emit({ row, col });
    }
  }
}
