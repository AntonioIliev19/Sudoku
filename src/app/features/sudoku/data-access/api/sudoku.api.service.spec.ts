import { TestBed } from '@angular/core/testing';

import { SudokuApiService } from './sudoku.api.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { API_BASE_URL } from './api.config';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { encodeParams } from '../../utils/encode';

describe('SudokuService', () => {
  let service: SudokuApiService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://test.api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: baseUrl },
      ],
    });
    service = TestBed.inject(SudokuApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be board', () => {
    const mockResponse = {
      board: [
        [2, 0, 1, 6, 0, 0, 0, 7, 4],
        [3, 0, 0, 1, 0, 9, 2, 0, 0],
        [6, 0, 0, 2, 0, 0, 1, 0, 0],
        [0, 2, 3, 0, 5, 0, 7, 0, 0],
        [0, 0, 0, 8, 0, 0, 3, 0, 0],
        [7, 0, 8, 0, 0, 0, 4, 0, 6],
        [5, 0, 0, 0, 6, 4, 8, 9, 0],
        [0, 6, 0, 9, 0, 0, 5, 0, 1],
        [0, 3, 0, 0, 0, 0, 6, 2, 7],
      ],
    };

    service.getBoard('easy').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/board?difficulty=easy`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should validate board', () => {
    const board = [
      [2, 0, 1, 6, 0, 0, 0, 7, 4],
      [3, 0, 0, 1, 0, 9, 2, 0, 0],
      [6, 0, 0, 2, 0, 0, 1, 0, 0],
      [0, 2, 3, 0, 5, 0, 7, 0, 0],
      [0, 0, 0, 8, 0, 0, 3, 0, 0],
      [7, 0, 8, 0, 0, 0, 4, 0, 6],
      [5, 0, 0, 0, 6, 4, 8, 9, 0],
      [0, 6, 0, 9, 0, 0, 5, 0, 1],
      [0, 3, 0, 0, 0, 0, 6, 2, 7],
    ];

    service.validateBoard(board).subscribe((response) => {
      expect(response).toEqual({ status: 'solved' });
    });

    const req = httpMock.expectOne(`${baseUrl}/validate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(
      'board=' + encodeURIComponent(JSON.stringify(board)),
    );
    expect(req.request.headers.get('Content-Type')).toBe(
      'application/x-www-form-urlencoded',
    );
    req.flush({ status: 'solved' });
  });

  it('should solve board', () => {
    const board = [
      [2, 0, 1, 6, 0, 0, 0, 7, 4],
      [3, 0, 0, 1, 0, 9, 2, 0, 0],
      [6, 0, 0, 2, 0, 0, 1, 0, 0],
      [0, 2, 3, 0, 5, 0, 7, 0, 0],
      [0, 0, 0, 8, 0, 0, 3, 0, 0],
      [7, 0, 8, 0, 0, 0, 4, 0, 6],
      [5, 0, 0, 0, 6, 4, 8, 9, 0],
      [0, 6, 0, 9, 0, 0, 5, 0, 1],
      [0, 3, 0, 0, 0, 0, 6, 2, 7],
    ];

    const mockResponse = {
      solution: [
        [2, 0, 1, 6, 0, 0, 0, 7, 4],
        [3, 0, 0, 1, 0, 9, 2, 0, 0],
        [6, 0, 0, 2, 0, 0, 1, 0, 0],
        [0, 2, 3, 0, 5, 0, 7, 0, 0],
        [0, 0, 0, 8, 0, 0, 3, 0, 0],
        [7, 0, 8, 0, 0, 0, 4, 0, 6],
        [5, 0, 0, 0, 6, 4, 8, 9, 0],
        [0, 6, 0, 9, 0, 0, 5, 0, 1],
        [0, 3, 0, 0, 0, 0, 6, 2, 7],
      ],
    };

    service.solveBoard(board).subscribe((response) => {
      expect(mockResponse).toEqual(response);
    });

    const req = httpMock.expectOne(`${baseUrl}/solve`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(encodeParams({ board }));
    expect(req.request.headers.get('Content-Type')).toBe(
      'application/x-www-form-urlencoded',
    );
    req.flush(mockResponse);
  });
});
