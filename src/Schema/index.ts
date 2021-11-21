import { Type } from '@sinclair/typebox';

export const Color = Type.Union([
  Type.Literal('white'),
  Type.Literal('black')
]);

export const Piece = Type.Object({
  id: Type.String(),
  type: Type.Union([
    Type.Literal('king'),
    Type.Literal('queen'),
    Type.Literal('rook'),
    Type.Literal('bishop'),
    Type.Literal('knight'),
    Type.Literal('pawn')
  ]),
  color: Color
});

export const Field = Type.Object({
  index: Type.Number(),
  piece: Type.Optional(Piece)
});

export const Board = Type.Array(Field);

export const Pick = Type.Object({
  type: Type.Literal('pick'),
  field: Field
});

export const Move = Type.Object({
  type: Type.Literal('move'),
  from: Field,
  to: Field,
});

export const Castling = Type.Object({
  type: Type.Literal('castling'),
  king: Move,
  rook: Move,
});

export const Promotion = Type.Object({
  type: Type.Literal('promotion'),
  piece: Piece,
  move: Move
});

export const Placement = Type.Union([Move, Castling, Promotion]);

export const Action = Type.Union([Pick, Move, Castling, Promotion]);

export const Turn = Type.Tuple([Pick, Placement]);

export const Timeline = Type.Object({
  history: Type.Array(Action),
  future: Type.Array(Action)
});

export const State = Type.Object({
  board: Board,
  timeline: Timeline,
  actions: Type.Array(Action)
});