import * as Type from 'Type';
import * as Constant from 'Constant';
import * as Grid from './Grid';
import * as Board from './Board';

type Board = Type.Board;
type Cartesian = Type.Grid.Cartesian;
type Orientation = Type.Grid.Orientation;

const shorten = (board: Board, index: number) => (
  (cartesians: Cartesian[]) => (
    cartesians.slice(
      0,
      Grid.Line
        .absolute(Grid.Position.cartesian(index), cartesians)
        .map(({ x, y }) => Grid.Position.index(x, y))
        .findIndex(index => board[index].piece)
        + 1 ||
      cartesians.length
    )
  )
);

const cartesians = (index: number, board: Board) => (orientation: Orientation) => (
  Grid.Line
    .draw(index, orientation, {
      x: Constant.Board.max,
      y: Constant.Board.max,
    })
    .map(shorten(board, index))
    .flat()
);

export const move = (
  index: number,
  orientations: Orientation[],
  board: Board
) => (
  orientations
    .map(cartesians(index, board))
    .flat()
);