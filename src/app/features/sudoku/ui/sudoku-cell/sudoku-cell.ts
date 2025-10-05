import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { isInRange } from '../../utils/rules';

@Component({
  selector: 'app-sudoku-cell',
  imports: [],
  templateUrl: './sudoku-cell.html',
  styleUrl: './sudoku-cell.scss',
})
export class SudokuCell {
  value = input();
  fixed: InputSignal<boolean> = input(false);
  col: InputSignal<string | undefined> = input<string>();
  row: InputSignal<string | undefined> = input<string>();
  disabled: InputSignal<boolean> = input<boolean>(false);
  selected: InputSignal<boolean> = input<boolean>(false);

  @Output() cellInput = new EventEmitter<number>();
  @Output() cellClear = new EventEmitter();
  @Output() cellSelect = new EventEmitter();
  @Output() cellBlur = new EventEmitter();

  onInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const value = parseInt(input, 10);

    if (isNaN(value)) {
      (event.target as HTMLInputElement).value = '';
      this.cellClear.emit();
    } else if (isInRange(value)) {
      this.cellInput.emit(value);
    } else {
      (event.target as HTMLInputElement).value = '';
      this.cellClear.emit();
    }
  }

  onSelect() {
    if (!this.disabled() && !this.fixed()) {
      this.cellSelect.emit();
    }
  }

  onBlur() {
    this.cellBlur.emit();
  }
}
