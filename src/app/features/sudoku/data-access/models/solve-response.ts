import { Difficulty } from './difficulty';
import { Board } from './board';

export interface SolveResponse {
  solution: Board;
  difficulty: Difficulty;
  status: 'solved' | 'unsolvable';
}
