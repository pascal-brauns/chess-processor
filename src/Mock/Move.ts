import * as Type from 'Type';
import * as Board from './Board';

type Board = Type.Board;
type Move = Type.Move;
type Piece = Type.Piece;

type Mock = {
  before: Board;
  after: Board;
  action: Move;
};

const black: Piece = {
  type: 'pawn',
  id: '<ID>',
  color: 'black',
};

const white: Piece = {
  type: 'pawn',
  id: '<ID>',
  color: 'white',
};

export const move: Mock = {
  before: Board.fields(
    Board.field(52, white),
    Board.field(43, null)
  ),
  after: Board.fields(
    Board.field(52, null),
    Board.field(43, white)
  ),
  action: {
    type: 'move',
    from: Board.field(52, white),
    to: Board.field(43, null)
  }
};

export const hit: Mock = {
  before: Board.fields(
    Board.field(52, white),
    Board.field(42, black)
  ),
  after: Board.fields(
    Board.field(52, null),
    Board.field(42, white)
  ),
  action: {
    type: 'move',
    from: Board.field(52, white),
    to: Board.field(42, black)
  }
};