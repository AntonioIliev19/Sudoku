import { Component, computed, inject, OnInit } from '@angular/core';
import { SudokuTable } from '../sudoku-table/sudoku-table';
import { Actions } from '../actions/actions';
import { GameFacade } from '../../data-access/facade/game.facade';
import { Difficulty } from '../../data-access/models/difficulty';

@Component({
  selector: 'app-sudoku',
  imports: [SudokuTable, Actions],
  templateUrl: './sudoku.html',
  styleUrl: './sudoku.scss',
})
export class Sudoku implements OnInit {
  private facade = inject(GameFacade);

  board = this.facade.board;
  status = this.facade.status;
  loading = this.facade.loading;
  error = this.facade.error;
  selection = this.facade.selection;
  fixedMask = this.facade.fixedMask;
  sudokuConfig = computed(() => this.getSudokuConfig());
  level = this.facade.level;

  ngOnInit() {
    this.facade.newGame('easy');
  }

  onCellInput(e: { pos: { row: number; col: number }; value: number }) {
    this.facade.setCell(e.pos, e.value);
  }

  onCellClear(pos: { row: number; col: number }) {
    this.facade.clearCell(pos);
  }
  onCellSelect(pos: { row: number; col: number } | null) {
    this.facade.setSelection(pos);
  }

  onNewGame(difficulty: Difficulty) {
    this.facade.newGame(difficulty);
  }

  onValidate() {
    this.facade.validateBoard();
  }

  onSolve() {
    this.facade.solveBoard();
  }

  private getSudokuConfig() {
    return {
      board: this.board(),
      selection: this.selection(),
      fixedMask: this.fixedMask(),
      disabled: this.loading().generate,
      loading:
        this.loading().generate ||
        this.loading().solve ||
        this.loading().validate,
    };
  }
}
