import * as Type from 'Type';
import * as Move from './Move';

type Board = Type.Board;
type Promotion = Type.Promotion;

export const apply = (board: Board, promotion: Promotion): Board => {
  const next = Move.apply(board, promotion.move);
  next[promotion.move.to.index] = {
    index: promotion.move.to.index,
    piece: promotion.piece
  }
  return next;
};

export const undo = (board: Board, promotion: Promotion): Board => {
  const next = Move.undo(board, promotion.move);
  next[promotion.move.from.index] = {
    index: promotion.move.from.index,
    piece: {
      id: promotion.piece.id,
      type: 'pawn',
      color: promotion.piece.color
    }
  };
  return next;
}