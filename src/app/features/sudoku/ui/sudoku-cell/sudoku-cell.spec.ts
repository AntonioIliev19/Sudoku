import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuCell } from './sudoku-cell';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SudokuCell', () => {
  let component: SudokuCell;
  let fixture: ComponentFixture<SudokuCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuCell],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SudokuCell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
