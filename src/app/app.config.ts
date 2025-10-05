import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { API_BASE_URL } from './features/sudoku/data-access/api/api.config';
import { SUDOKU_API_PROVIDER } from './features/sudoku/data-access/api/sudoku.api.providers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { boardErrorInterceptor } from './core/interceptors/board-error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([boardErrorInterceptor])),
    { provide: API_BASE_URL, useValue: 'https://sugoku.onrender.com' },
    SUDOKU_API_PROVIDER,
  ],
};
