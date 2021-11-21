import * as Type from 'Type';
import * as Board from './Board';
import * as Color from './Color';
import * as Grid from './Grid';
import * as Dynamic from './Dynamic';

type Board = Type.Board;
type Color = Type.Color;
type Pick = Type.Pick;

export const pawn = (board: Board, pick: Pick) => {
  const root = Grid.Position.cartesian(pick.field.index);
  const { color } = pick.field.piece;
  const forward = (color: Color) => color === 'white' ? -1 : 1;

  const empty = (...offsets: number[]) => (
    offsets
      .map(offset => Grid.Position.index(
        root.x,
        root.y + offset * forward(color)
      ))
      .every(index => !board[index]?.piece)
  );
  const initial = (
    color === 'white' && root.y === 6 ||
    color === 'black' && root.y === 1
  );
  return [
    empty(1)
      ? [{ x: 0, y: 1 * forward(color) }]
      : [],
    empty(1, 2) && initial
      ? [{ x: 0, y: 2 * forward(color) }]
      : [],
    [-1, 1]
      .map(x => ({ x, y: forward(color) }))
      .filter(({ x, y }) => (
        Board
          .player(board, Color.opposite(color))
          .some(field => field.index === (
            Grid.Position.index(root.x + x, root.y + y)
          ))
      ))
  ].flat();
}

export const knight = () => [
  { x: -1, y: 2 },
  { x: 1, y: 2 },
  { x: -2, y: 1 },
  { x: -2, y: -1 },
  { x: 2, y: 1 },
  { x: 2, y: -1 },
  { x: -1, y: -2 },
  { x: 1, y: -2 },
];

export const king = () => [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];

export const rook = (board: Board, pick: Pick) => Dynamic.move(
  pick.field.index,
  ['horizontal', 'vertical'],
  board
);

export const bishop = (board: Board, pick: Pick) => Dynamic.move(
  pick.field.index,
  ['ascending', 'descending'],
  board
);

export const queen = (board: Board, pick: Pick) => Dynamic.move(
  pick.field.index,
  ['ascending', 'descending', 'horizontal', 'vertical'],
  board
);