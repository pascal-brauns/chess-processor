import * as Type from 'Type';

type Board = Type.Board;
type Color = Type.Color;
type Field = Type.Field;
type Piece = Type.Piece;

export const field = (index: number, piece: Piece): Field => ({
  index,
  piece
});

const piece = (type: Piece['type'], color: Color): Piece => ({
  type,
  id: '<ID>',
  color,
});

export const empty = (
  Array(64)
    .fill(null)
    .map((_, index) => field(index, null))
);

export const fields = (...fields: Field[]) => (
  fields.reduce<Board>(
    (board, field) => {
      board[field.index] = field;
      return board;
    },
    [...empty]
  )
);

type Mock = {
  turn: Color;
  board: Board;
};

export const invalid: Mock = {
  turn: 'white',
  board: fields(
    field(28, piece('queen', 'black')),
    field(60, piece('king', 'white')),
  )
};

export const valid: Mock = {
  turn: 'white',
  board: fields(
    field(28, piece('queen', 'black')),
    field(52, piece('pawn', 'white')),
    field(60, piece('king', 'white')),
  )
}