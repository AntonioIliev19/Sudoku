import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-error',
  imports: [MatIcon],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error {
  errorMessage = input<string | null>();
}
