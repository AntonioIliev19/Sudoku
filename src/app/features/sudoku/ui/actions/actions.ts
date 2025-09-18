import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '../../data-access/models/game-status';
import { Difficulty } from '../../data-access/models/difficulty';

@Component({
  selector: 'app-actions',
  imports: [],
  templateUrl: './actions.html',
  styleUrl: './actions.scss',
})
export class Actions {
  @Input() status!: Status;
  @Input() level!: Difficulty;
  @Output() solve = new EventEmitter<void>();
  @Output() generate = new EventEmitter<Difficulty>();
  @Output() validate = new EventEmitter<void>();

  readonly difficulties = ['easy', 'medium', 'hard', 'random'] as const;
}
