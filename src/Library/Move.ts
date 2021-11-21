import _ from 'lodash';
import * as Type from 'Type';

type Board = Type.Board;
type Move = Type.Move;

export const apply = (board: Board, move: Move) => {
  const next = _.cloneDeep(board);
  next[move.from.index].piece = null;
  next[move.to.index] = {
    index: move.to.index,
    piece: move.from.piece
  };
  return next;
}

export const undo = (board: Board, move: Move) => {
  const next = _.cloneDeep(board);
  next[move.from.index].piece = move.from.piece;
  next[move.to.index].piece = move.to.piece || null;
  return next;
};