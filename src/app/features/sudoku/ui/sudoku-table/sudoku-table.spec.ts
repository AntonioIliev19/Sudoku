import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuTable } from './sudoku-table';

describe('SudokuTable', () => {
  let component: SudokuTable;
  let fixture: ComponentFixture<SudokuTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
