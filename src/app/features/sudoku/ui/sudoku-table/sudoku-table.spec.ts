import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuTable } from './sudoku-table';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SudokuTable', () => {
  let component: SudokuTable;
  let fixture: ComponentFixture<SudokuTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuTable],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SudokuTable);
    component = fixture.componentInstance;

    component.config = {
      fixedMask: [[false]],
      disabled: false,
      loading: false,
      board: [[0]],
      selection: null,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
