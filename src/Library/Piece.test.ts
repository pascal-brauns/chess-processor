import * as Mock from 'Mock';
import * as Piece from './Piece';

test('Piece.pawn', () => {
  const field = Mock.Board.field(52, Mock.piece('pawn', 'white'));
  expect(
    Piece.pawn(
      Mock.Board.fields(
        Mock.Board.field(44, Mock.piece('pawn', 'black')),
        field
      ),
      {
        type: 'pick',
        field
      }
    )
  ).toEqual([]);
});