import * as Mock from 'Mock';
import * as Dynamic from './Dynamic';

test('Dynamic.move', () => {
  expect(Dynamic.move(
    35,
    ['horizontal', 'vertical', 'ascending', 'descending'],
    Mock.Board.fields(
      Mock.Board.field(11, Mock.piece('pawn', 'black')),
      Mock.Board.field(14, Mock.piece('pawn', 'black')),
      Mock.Board.field(17, Mock.piece('pawn', 'white')),
      Mock.Board.field(32, Mock.piece('pawn', 'white')),
      Mock.Board.field(35, Mock.piece('queen', 'white')),
      Mock.Board.field(38, Mock.piece('pawn', 'black')),
      Mock.Board.field(44, Mock.piece('pawn', 'white')),
      Mock.Board.field(56, Mock.piece('rook', 'white')),
    )
  )).toEqual(
    expect.arrayContaining([
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },

      { x: -1, y: 0 },
      { x: -2, y: 0 },
      { x: -3, y: 0 },

      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },

      { x: 0, y: -1 },
      { x: 0, y: -2 },
      { x: 0, y: -3 },

      { x: 1, y: 1 },

      { x: -1, y: -1 },
      { x: -2, y: -2 },

      { x: 1, y: -1 },
      { x: 2, y: -2 },
      { x: 3, y: -3 },

      { x: -1, y: 1 },
      { x: -2, y: 2 },
      { x: -3, y: 3 },
    ])
  );
});