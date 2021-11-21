import * as Type from 'Type';
import * as Constant from 'Constant';
import * as Board from './Board';
import * as Action from './Action';
import * as Grid from './Grid';
import * as Piece from './Piece';

type Board = Type.Board;
type Pick = Type.Pick;
type Cartesian = Type.Grid.Cartesian;

export const actions = (pick: Pick, board: Board) => {
  const modifiers = select(pick);
  return (
    modifiers(board, pick)
      .filter(valid(board, pick))
      .map(action(board, pick))
  )
};

const select = (pick: Pick) => {
  switch (pick.field.piece.type) {
    case 'bishop': return Piece.bishop;
    case 'king': return Piece.king;
    case 'knight': return Piece.knight;
    case 'pawn': return Piece.pawn;
    case 'queen': return Piece.queen;
    case 'rook': return Piece.rook;
    /* istanbul ignore next */
    default: return null;
  }
}

const action = (board: Board, pick: Pick) => ({ x, y }: Cartesian) => {
  const target = Grid.Position.index(x, y) + pick.field.index;
  const move = Action.move(pick.field, board[target]);
  return (
    promotion(pick, target)
      ? Action.promotion(move, null)
      : move
  );
}

const promotion = (pick: Pick, index: number) => (
  pick.field.piece.type === 'pawn' && (
    index < Constant.Board.width ||
    index > Constant.Board.area - Constant.Board.width
  )
);

const valid = (board: Board, pick: Pick) => (modifier: Cartesian) => (
  !overflow(pick, modifier) &&
  !Board
    .player(board, board[pick.field.index].piece.color)
    .find(field => (
      field.index === pick.field.index + Grid.Position.index(modifier.x, modifier.y)
    ))
);

const overflow = (pick: Pick, modifier: Cartesian) => {
  const root = Grid.Position.cartesian(pick.field.index);
  return (
    Object
      .values(Grid.Position.combine(root, modifier))
      .some(value => value < Constant.Board.min || value > Constant.Board.max)
  );
};