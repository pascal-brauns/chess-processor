import * as Type from 'Type';

type Action = Type.Action;
type Piece = Type.Piece;
type Castling = Type.Castling;
type Move = Type.Move;
type Pick = Type.Pick;
type Promotion = Type.Promotion;
type Field = Type.Field;

export const target = (action: Action): number => {
  switch (action?.type) {
    case 'move': return action.to.index;
    case 'pick': return action.field.index;
    case 'castling': return target(action.king);
    case 'promotion': return target(action.move);
    default: return null;
  }
}

export const piece = (action: Action): Piece => {
  switch (action?.type) {
    case 'move': return action.from.piece;
    case 'pick': return action.field.piece;
    case 'castling': return piece(action.king);
    case 'promotion': return piece(action.move);
    default: return null;
  }
};

export const pick = (field: Field): Pick => ({
  type: 'pick',
  field
});

export const move = (from: Field, to: Field): Move => ({
  type: 'move',
  from,
  to
});

export const castling = (king: Move, rook: Move): Castling => ({
  type: 'castling',
  king,
  rook
});

export const promotion = (move: Move, piece: Piece): Promotion => ({
  type: 'promotion',
  piece,
  move
});