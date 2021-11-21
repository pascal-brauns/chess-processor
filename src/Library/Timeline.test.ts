import * as Type from 'Type';
import * as Mock from 'Mock';
import * as Timeline from './Timeline';

type Move = Type.Move;
type Piece = Type.Piece;

const move = (piece: Piece, from: number, to: number): Move => ({
  type: 'move',
  from: {
    index: from,
    piece
  },
  to: {
    index: to,
  }
});

const moves: Move[] = [
  move(Mock.piece('pawn', 'white'), 52, 43),
  move(Mock.piece('pawn', 'white'), 51, 42),
  move(Mock.piece('pawn', 'black'), 12, 27),
  move(Mock.piece('pawn', 'white'), 51, 41)
];

test('Timeline.dispatch', () => {
  expect(Timeline.dispatch(
    {
      history: [],
      future: []
    },
    moves[0]
  )).toEqual({
    history: [moves[0]],
    future: []
  });

  expect(Timeline.dispatch(
    {
      history: [],
      future: [moves[0]]
    },
    moves[1]
  )).toEqual({
    history: [moves[1]],
    future: []
  });

  expect(Timeline.dispatch(
    {
      history: [moves[0]],
      future: []
    },
    moves[2]
  )).toEqual({
    history: [moves[2], moves[0]],
    future: []
  });

  expect(Timeline.dispatch(
    {
      history: [],
      future: [moves[1]]
    },
    {
      type: 'pick',
      field: Mock.Board.field(52, Mock.piece('pawn', 'white'))
    }
  )).toEqual({
    history: [],
    future: [moves[1]]
  });
});

test('Timeline.initial', () => {
  expect(Timeline.initial(
    {
      history: [],
      future: []
    },
    [Mock.piece('pawn', 'white', 'A')]
  )).toEqual(true);

  expect(Timeline.initial(
    {
      history: [move(Mock.piece('pawn', 'white', 'A'), 52, 43)],
      future: []
    },
    [Mock.piece('pawn', 'white', 'A')]
  )).toEqual(false);

  expect(Timeline.initial(
    {
      history: [],
      future: [move(Mock.piece('pawn', 'white', 'A'), 52, 43)]
    },
    [Mock.piece('pawn', 'white', 'A')]
  )).toEqual(true);
});

test('Timeline.backward', () => {
  const { before, after } = Mock.Timeline.backward;
  expect(Timeline.backward(before))
    .toEqual(after);
});

test('Timeline.forward', () => {
  const { before, after } = Mock.Timeline.forward;
  expect(Timeline.forward(before))
    .toEqual(after);
});