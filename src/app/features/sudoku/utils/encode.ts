const encodeBoard = (board: Array<Array<number>>): string =>
  board.reduce(
    (result, row, i) =>
      result +
      `${encodeURIComponent(JSON.stringify(row))}${i === board.length - 1 ? '' : '%2C'}`,
    '',
  );

export const encodeParams = (params: any): string =>
  Object.keys(params)
    .map((key) => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');
