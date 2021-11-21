import * as Type from 'Type';
import * as Mock from 'Mock';
import * as Board from './Board';

type Board = Type.Board;

test('Board.empty', () => {
  expect(Board.empty(
    Mock.Board.fields(
      Mock.Board.field(0, Mock.piece('rook', 'black')),
      Mock.Board.field(1, null)
    ),
    [0, 1]
  )).toEqual(false);

  expect(Board.empty(
    Mock.Board.fields(
      Mock.Board.field(0, null),
      Mock.Board.field(1, null)
    ),
    [0, 1]
  )).toEqual(true);
});

test('Board.player', () => {
  expect(
    Board
      .player(
        Mock.Board.fields(
          Mock.Board.field(0, Mock.piece('rook', 'black')),
          Mock.Board.field(1, null),
          Mock.Board.field(8, Mock.piece('pawn', 'black')),
          Mock.Board.field(56, Mock.piece('rook', 'white')),
          Mock.Board.field(57, null),
          Mock.Board.field(48, Mock.piece('pawn', 'white'))
        ),
        'white'
      )
  ).toEqual([
    Mock.Board.field(48, Mock.piece('pawn', 'white')),
    Mock.Board.field(56, Mock.piece('rook', 'white'))
  ])
});

test('Board.apply', () => {
  expect(Board.apply(Mock.Move.move.before, Mock.Move.move.action))
    .toEqual(Mock.Move.move.after);

  expect(Board.apply(Mock.Promotion.before, Mock.Promotion.action))
    .toEqual(Mock.Promotion.after);
  
  expect(
    Board.apply(
      Mock.Castling.short.before,
      Mock.Castling.short.action
    )
  ).toEqual(Mock.Castling.short.after);

  expect(Board.apply([], null))
    .toEqual([]);
});

test('Board.undo', () => {
  expect(Board.undo(Mock.Move.move.after, Mock.Move.move.action))
    .toEqual(Mock.Move.move.before);

  expect(Board.undo(Mock.Promotion.after, Mock.Promotion.action))
    .toEqual(Mock.Promotion.before);
  
  expect(
    Board.undo(
      Mock.Castling.short.after,
      Mock.Castling.short.action
    )
  ).toEqual(Mock.Castling.short.before);

  expect(Board.undo([], null))
    .toEqual([]);
});

test('Board.valid', () => {
  const { valid, invalid } = Mock.Board;
  expect(Board.valid(invalid.board, invalid.turn))
    .toEqual(false);
  expect(Board.valid(valid.board, valid.turn))
    .toEqual(true);
});