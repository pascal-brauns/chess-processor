import * as Type from 'Type';
import * as Board from './Board';

type Board = Type.Board;
type Move = Type.Move;
type Promotion = Type.Promotion;
type Piece = Type.Piece;

const pawn: Piece = {
  type: 'pawn',
  id: '<ID>',
  color: 'white'
};

const move: Move = {
  type: 'move',
  from: Board.field(14, pawn),
  to: Board.field(6, null)
};

const queen: Piece = {
  type: 'queen',
  id: '<ID>',
  color: 'white'
};

export const action: Promotion = {
  type: 'promotion',
  piece: queen,
  move
};

export const before: Board = Board.fields(
  Board.field(14, pawn),
  Board.field(6, null)
);

export const after: Board = Board.fields(
  Board.field(14, null),
  Board.field(6, queen)
);