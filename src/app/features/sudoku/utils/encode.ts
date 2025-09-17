export function encodeBoard(board: Array<Array<number>>): string {
  const parts: string[] = [];

  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      const key = `board[${i}][${j}]`;
      const value = String(row[j] ?? 0);
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  return parts.join('&');
}

export function encodeParams(params: { board: Array<Array<number>> }): string {
  return encodeBoard(params.board);
}
