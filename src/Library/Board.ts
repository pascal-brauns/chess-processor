import * as Type from 'Type';
import * as Action from './Action';
import * as Color from './Color';
import * as Promotion from './Promotion';
import * as Move from './Move';
import * as Castling from './Castling';
import * as Modifier from './Modifier';

type Action = Type.Action;
type Board = Type.Board;
type Color = Type.Color;
type Field = Type.Field;
type Move = Type.Move;
type Promotion = Type.Promotion;

export const empty = (board: Board, indices: number[]) => (
  indices.every(index => !board[index].piece)
);

export const player = (board: Board, color: Color): Field[] => (
  board
    .filter(field => field.piece?.color === color)
);

export const undo = (board: Board, action: Action): Board => {
  switch (action?.type) {
    case 'move': return Move.undo(board, action);
    case 'promotion': return Promotion.undo(board, action);
    case 'castling': return Castling.undo(board, action);
    default: return board;
  }
};

export const apply = (board: Board, action: Action) => {
  switch (action?.type) {
    case 'move': return Move.apply(board, action);
    case 'promotion': return Promotion.apply(board, action);
    case 'castling': return Castling.apply(board, action);
    default: return board;
  }
};

export const valid = (board: Board, turn: Color) => {
  const king = (
    player(board, turn)
      .find(field => field.piece.type === 'king')
  );
  return !(
    king &&
    player(board, Color.opposite(turn))
      .map(field => (
        Modifier
          .actions(Action.pick(field), board)
          .map(Action.target)
      ))
      .flat()
      .includes(king.index)
  );
};