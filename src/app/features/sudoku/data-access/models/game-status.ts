export type Status =
  | 'idle'
  | 'loading'
  | 'solved'
  | 'error'
  | 'unsolved'
  | 'broken'
  | 'unsolvable';

export enum GameStatus {
  Loading = 'loading',
  Unsolved = 'unsolved',
  Unsolvable = 'unsolvable',
  Solved = 'solved',
  Error = 'error',
  Broken = 'broken',
}
