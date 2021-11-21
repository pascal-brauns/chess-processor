import * as Mock from 'Mock';
import * as Turn from './Turn';

test('Turn.picks', () => {
  expect(Turn.picks(
    Mock.Board.fields(
      Mock.Board.field(60, Mock.piece('king', 'white')),
      Mock.Board.field(52, Mock.piece('pawn', 'white')),
      Mock.Board.field(24, Mock.piece('queen', 'black'))
    ),
    { history: [], future: [] },
  )).toEqual(expect.arrayContaining([
    {
      type: 'pick',
      field: Mock.Board.field(60, Mock.piece('king', 'white'))
    }
  ]));
});

test('Turn.placements', () => {
  expect(Turn.placements(
    Mock.Board.fields(
      Mock.Board.field(4, Mock.piece('queen', 'black')),
      Mock.Board.field(13, Mock.piece('pawn', 'white')),
      Mock.Board.field(60, Mock.piece('king', 'white')),
      Mock.Board.field(63, Mock.piece('rook', 'white'))
    ),
    { history: [], future: [] },
    {
      type: 'pick',
      field: Mock.Board.field(60, Mock.piece('king', 'white'))
    }
  )).toEqual(expect.arrayContaining([
    {
      type: 'move',
      from: Mock.Board.field(60, Mock.piece('king', 'white')),
      to: Mock.Board.field(51, null),
    },
    {
      type: 'move',
      from: Mock.Board.field(60, Mock.piece('king', 'white')),
      to: Mock.Board.field(53, null)
    },
    {
      type: 'move',
      from: Mock.Board.field(60, Mock.piece('king', 'white')),
      to: Mock.Board.field(59, null)
    },
    {
      type: 'move',
      from: Mock.Board.field(60, Mock.piece('king', 'white')),
      to: Mock.Board.field(61, null)
    },
    {
      type: 'castling',
      king: {
        type: 'move',
        from: Mock.Board.field(60, Mock.piece('king', 'white')),
        to: Mock.Board.field(62, null)
      },
      rook: {
        type: 'move',
        from: Mock.Board.field(63, Mock.piece('rook', 'white')),
        to: Mock.Board.field(61, null)
      }
    },
  ]));

  expect(Turn.placements(
    Mock.Board.fields(
      Mock.Board.field(4, Mock.piece('queen', 'black')),
      Mock.Board.field(13, Mock.piece('pawn', 'white')),
      Mock.Board.field(60, Mock.piece('king', 'white')),
      Mock.Board.field(63, Mock.piece('rook', 'white'))
    ),
    { history: [], future: [] },
    {
      type: 'pick',
      field: Mock.Board.field(13, Mock.piece('pawn', 'white'))
    }
  )).toEqual(expect.arrayContaining([
    {
      type: 'promotion',
      piece: null,
      move: {
        type: 'move',
        from: Mock.Board.field(13, Mock.piece('pawn', 'white')),
        to: Mock.Board.field(4, Mock.piece('queen', 'black'))
      }
    }
  ]));
});