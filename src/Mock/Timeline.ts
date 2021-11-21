import * as Type from 'Type';
import * as Board from './Board';

type Move = Type.Move;
type Piece = Type.Piece;
type Timeline = Type.Timeline;

type Mock = {
  before: Timeline;
  after: Timeline;
};

const pawn: Piece = {
  type: 'pawn',
  color: 'white',
  id: '<ID>',
};

const moves: Move[] = [
  {
    type: 'move',
    from: Board.field(52, pawn),
    to: Board.field(43, null)
  },
  {
    type: 'move',
    from: Board.field(51, pawn),
    to: Board.field(41, null)
  }
];

export const backward: Mock = {
  before: {
    history: [moves[0]],
    future: [moves[1]]
  },
  after: {
    history: [],
    future: [moves[0], moves[1]]
  }
}

export const forward: Mock = {
  before: {
    history: [moves[0]],
    future: [moves[1]]
  },
  after: {
    history: [moves[1], moves[0]],
    future: []
  }
}