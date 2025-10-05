import { Component, computed, inject, OnInit } from '@angular/core';
import { SudokuTable } from '../sudoku-table/sudoku-table';
import { Actions } from '../actions/actions';
import { GameFacade } from '../../data-access/facade/game.facade';
import { Difficulty } from '../../data-access/models/difficulty';
import { MatDialog } from '@angular/material/dialog';
import { InformationDialog } from '../dialogs/information-dialog/information-dialog';
import { MatIcon } from '@angular/material/icon';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { Error } from '../../../shared/ui/error/error';
import { GameStatus } from '../../data-access/models/game-status';

@Component({
  selector: 'app-sudoku',
  imports: [SudokuTable, Actions, MatIcon, LoadingSpinner, Error],
  templateUrl: './sudoku.html',
  styleUrl: './sudoku.scss',
})
export class Sudoku implements OnInit {
  protected readonly GameStatus = GameStatus;

  private facade = inject(GameFacade);
  private dialog = inject(MatDialog);

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
    console.log(this.status());
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

  public openInformationDialog() {
    this.dialog.open(InformationDialog, {
      width: '520px',
      autoFocus: false,
    });
  }
}
