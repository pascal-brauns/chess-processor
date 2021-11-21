import * as Type from 'Type';
import * as Board from './Board';

type Board = Type.Board;
type Castling = Type.Castling;
type Piece = Type.Piece;

type Mock = {
  before: Board;
  after: Board;
  action: Castling;
};

const king: Piece = {
  type: 'king',
  id: '<ID>',
  color: 'white',
};

const rook: Piece = {
  type: 'rook',
  id: '<ID>',
  color: 'white'
};

export const short: Mock = {
  before: Board.fields(
    Board.field(60, king),
    Board.field(61, null),
    Board.field(62, null),
    Board.field(63, rook)
  ),
  after: Board.fields(
    Board.field(60, null),
    Board.field(61, rook),
    Board.field(62, king),
    Board.field(63, null),
  ),
  action: {
    type: 'castling',
    king: {
      type: 'move',
      from: Board.field(60, king),
      to: Board.field(62, null)
    },
    rook: {
      type: 'move',
      from: Board.field(63, rook),
      to: Board.field(61, null)
    }
  }
};

export const long: Mock = {
  before: Board.fields(
    Board.field(56, rook),
    Board.field(57, null),
    Board.field(58, null),
    Board.field(59, null),
    Board.field(60, king)
  ),
  after: Board.fields(
    Board.field(56, null),
    Board.field(57, null),
    Board.field(58, king),
    Board.field(59, rook),
    Board.field(60, null)
  ),
  action: {
    type: 'castling',
    king: {
      type: 'move',
      from: Board.field(60, king),
      to: Board.field(58, null)
    },
    rook: {
      type: 'move',
      from: Board.field(56, rook),
      to: Board.field(59, null)
    }
  }
}