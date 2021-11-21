import * as Type from 'Type';
import * as Mock from 'Mock';
import * as Modifier from './Modifier';

type Piece = Type.Piece;
type Move = Type.Move;

test('Modifier.actions', () => {

  const rook = Mock.piece('rook', 'black');
  const bishop = Mock.piece('bishop', 'black');
  const knight = Mock.piece('knight', 'black');

  const move = (piece: Piece, from: number, to: number): Move => ({
    type: 'move',
    from: Mock.Board.field(from, piece),
    to: Mock.Board.field(to, null)
  });

  expect(Modifier.actions(
    {
      type: 'pick',
      field: Mock.Board.field(0, rook)
    },
    Mock.Board.fields(
      Mock.Board.field(0, rook)
    )
  )).toEqual(
    expect.arrayContaining(
      [1, 2, 3, 4, 5, 6, 7, 8, 16, 24, 32, 40, 48, 56]
        .map(to => move(rook, 0, to))
    )
  );

  expect(Modifier.actions(
    {
      type: 'pick',
      field: Mock.Board.field(1, knight)
    },
    Mock.Board.fields(
      Mock.Board.field(1, knight)
    )
  )).toEqual(
    expect.arrayContaining(
      [11, 16, 18]
        .map(to => move(knight, 1, to))
    )
  );

  expect(Modifier.actions(
    {
      type: 'pick',
      field: Mock.Board.field(2, bishop)
    },
    Mock.Board.fields(
      Mock.Board.field(2, bishop)
    )
  )).toEqual(
    expect.arrayContaining(
      [9, 16, 11, 20, 29, 38, 47]
        .map(to => move(bishop, 2, to))
    )
  );
});