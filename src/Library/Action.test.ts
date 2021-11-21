import * as Type from 'Type';
import * as Mock from 'Mock';
import * as Action from './Action';

type Castling = Type.Castling;
type Move = Type.Move;
type Pick = Type.Pick;
type Promotion = Type.Promotion;

test('Action.pick', () => {
  const field = Mock.Board.field(52, Mock.piece('pawn', 'white'));
  expect(Action.pick(field)).toEqual({
    type: 'pick',
    field
  })
});

test('Action.move', () => {
  const from = Mock.Board.field(52, Mock.piece('pawn', 'white'));
  const to = Mock.Board.field(43, null);
  expect(Action.move(from, to)).toEqual({
    type: 'move',
    from,
    to
  })
});

test('Action.castling', () => {
  const king: Move = {
    type: 'move',
    from: Mock.Board.field(60, Mock.piece('king', 'white')),
    to: Mock.Board.field(62, null)
  };
  const rook: Move = {
    type: 'move',
    from: Mock.Board.field(63, Mock.piece('rook', 'white')),
    to: Mock.Board.field(61, null)
  };
  expect(Action.castling(king, rook)).toEqual({
    type: 'castling',
    king,
    rook
  });
});

test('Action.promotion', () => {
  const move: Move = {
    type: 'move',
    from: Mock.Board.field(14, Mock.piece('pawn', 'white')),
    to: Mock.Board.field(6, null)
  };
  const piece = Mock.piece('queen', 'white');
  expect(Action.promotion(move, piece)).toEqual({
    type: 'promotion',
    piece,
    move
  });
});

test('Action.piece', () => {
  const castling: Castling = {
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
  };
  expect(Action.piece(castling))
    .toEqual(Mock.piece('king', 'white'));

  const move: Move = {
    type: 'move',
    from: Mock.Board.field(60, Mock.piece('king', 'white')),
    to: Mock.Board.field(62, null)
  };
  expect(Action.piece(move))
    .toEqual(Mock.piece('king', 'white'));

  const promotion: Promotion = {
    type: 'promotion',
    piece: Mock.piece('queen', 'white'),
    move: {
      type: 'move',
      from: Mock.Board.field(60, Mock.piece('pawn', 'white')),
      to: Mock.Board.field(62, null)
    }
  }

  expect(Action.piece(promotion))
    .toEqual(Mock.piece('pawn', 'white'));

  const pick: Pick = {
    type: 'pick',
    field: Mock.Board.field(52, Mock.piece('pawn', 'white'))
  };

  expect(Action.piece(pick))
    .toEqual(Mock.piece('pawn', 'white'));

  expect(Action.piece(null))
    .toEqual(null);
});

test('Action.target', () => {
  const move: Move = {
    type: 'move',
    from: Mock.Board.field(52, Mock.piece('pawn', 'white')),
    to: Mock.Board.field(43, null)
  };

  expect(Action.target(move))
    .toEqual(43);

  const pick: Pick = {
    type: 'pick',
    field: Mock.Board.field(52, Mock.piece('pawn', 'white'))
  };
  expect(Action.target(pick))
    .toEqual(52);

  const castling: Castling = {
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
  };
  expect(Action.target(castling))
    .toEqual(62);


  const promotion: Promotion = {
    type: 'promotion',
    piece: Mock.piece('queen', 'white'),
    move: {
      type: 'move',
      from: Mock.Board.field(14, Mock.piece('pawn', 'white')),
      to: Mock.Board.field(6, null)
    }
  };
  expect(Action.target(promotion))
    .toEqual(6);

  expect(Action.target(null))
    .toEqual(null);
});