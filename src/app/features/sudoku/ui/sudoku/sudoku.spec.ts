import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sudoku } from './sudoku';
import { provideZonelessChangeDetection } from '@angular/core';
import { SudokuApiService } from '../../data-access/api/sudoku.api.service';
import { SUDOKU_API } from '../../data-access/api/sudoku.api.token';
import { API_BASE_URL } from '../../data-access/api/api.config';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Sudoku', () => {
  let component: Sudoku;
  let fixture: ComponentFixture<Sudoku>;
  const baseUrl = 'http://test.api';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sudoku],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: baseUrl },
        SudokuApiService,
        { provide: SUDOKU_API, useExisting: SudokuApiService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Sudoku);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
