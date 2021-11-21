import * as Type from 'Type';
import * as Action from './Action';
import * as Board from './Board';
import * as Color from './Color';
import * as Dimension from './Grid/Dimension';
import * as Move from './Move';
import * as Timeline from './Timeline';

type Board = Type.Board;
type Castling = Type.Castling;
type Field = Type.Field;
type Timeline = Type.Timeline;
type Pick = Type.Pick;

const move = (field: Field, target: Field) => Action.move(
  field,
  target
);

const castling = (board: Board, king: Pick) => (rook: Field): Castling => ({
  type: 'castling',
  king: move(
    king.field,
    board[Dimension.between(king.field.index, rook.index)[1]]
  ),
  rook: move(rook, board[Dimension.between(king.field.index, rook.index)[0]]),
});

const valid = (board: Board, timeline: Timeline, pick: Pick) => (
  (field: Field) => (
    pick.field.piece.type === 'king' &&
    field.piece.type === 'rook' &&
    Timeline.initial(timeline, [pick.field.piece, field.piece]) &&
    Board.empty(board, Dimension.between(pick.field.index, field.index))
  )
);

export const actions = (board: Board, timeline: Timeline, pick: Pick): Castling[] => (
  Board
    .player(board, Color.turn(timeline))
    .filter(valid(board, timeline, pick))
    .map(castling(board, pick))
);

export const apply = (board: Board, castling: Castling) => (
  Move.apply(
    Move.apply(board, castling.king),
    castling.rook
  )
);

export const undo = (board: Board, castling: Castling) => (
  Move.undo(
    Move.undo(board, castling.king),
    castling.rook
  )
);