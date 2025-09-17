export type DifficultyDTO = 'easy' | 'medium' | 'hard';

export type BoardDTO = Array<Array<number>>;

export interface BoardResponseDTO {
  board: BoardDTO;
}

export interface SolveRequestDTO {
  board: BoardDTO;
}

export interface SolveResponseDTO {
  solution: BoardDTO;
  difficulty: DifficultyDTO;
  status: 'solved' | 'unsolvable';
}

export interface ValidateResponseDTO {
  status: 'solved' | 'broken';
}

