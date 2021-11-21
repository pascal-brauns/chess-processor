import * as Type from 'Type';
import * as Mock from 'Mock';
import * as State from './State';

type Pick = Type.Pick;
type Move = Type.Move;
type State = Type.State;

test('State.undo', () => {
  const state: State = {
    board: Mock.Board.fields(
      Mock.Board.field(44, Mock.piece('pawn', 'white'))
    ),
    timeline: {
      history: [
        {
          type: 'move',
          from: Mock.Board.field(52, Mock.piece('pawn', 'white')),
          to: Mock.Board.field(44, null),
        }
      ],
      future: [],
    },
    actions: []
  };

  expect(State.undo(state)).toEqual({
    board: Mock.Board.fields(
      Mock.Board.field(52, Mock.piece('pawn', 'white'))
    ),
    timeline: {
      history: [],
      future: [
        {
          type: 'move',
          from: Mock.Board.field(52, Mock.piece('pawn', 'white')),
          to: Mock.Board.field(44, null),
        }
      ]
    },
    actions: [
      {
        type: 'pick',
        field: Mock.Board.field(52, Mock.piece('pawn', 'white'))
      }
    ]
  });
});

test('State.redo', () => {
  const state: State = {
    board: Mock.Board.fields(
      Mock.Board.field(52, Mock.piece('pawn', 'white'))
    ),
    timeline: {
      history: [],
      future: [
        {
          type: 'move',
          from: Mock.Board.field(52, Mock.piece('pawn', 'white')),
          to: Mock.Board.field(44, null),
        }
      ]
    },
    actions: [
      {
        type: 'pick',
        field: Mock.Board.field(52, Mock.piece('pawn', 'white'))
      }
    ]
  };

  expect(State.redo(state)).toEqual({
    board: Mock.Board.fields(
      Mock.Board.field(44, Mock.piece('pawn', 'white'))
    ),
    timeline: {
      history: [
        {
          type: 'move',
          from: Mock.Board.field(52, Mock.piece('pawn', 'white')),
          to: Mock.Board.field(44, null),
        }
      ],
      future: [],
    },
    actions: []
  });
});

test('State.dispatch', () => {
  const pick: Pick = {
    type: 'pick',
    field: Mock.Board.field(52, Mock.piece('pawn', 'white'))
  };

  const moves: Move[] = [
    {
      type: 'move',
      from: Mock.Board.field(52, Mock.piece('pawn', 'white')),
      to: Mock.Board.field(44, null)
    },
    {
      type: 'move',
      from: Mock.Board.field(52, Mock.piece('pawn', 'white')),
      to: Mock.Board.field(36, null)
    }
  ];

  expect(State.dispatch({
    board: Mock.Board.fields(
      Mock.Board.field(12, Mock.piece('pawn', 'black')),
      Mock.Board.field(52, Mock.piece('pawn', 'white'))
    ),
    timeline: {
      history: [],
      future: []
    },
    actions: [pick]
  }, pick)).toEqual({
    board: Mock.Board.fields(
      Mock.Board.field(12, Mock.piece('pawn', 'black')),
      Mock.Board.field(52, Mock.piece('pawn', 'white')),
      Mock.Board.field(44, null),
      Mock.Board.field(36, null)
    ),
    timeline: {
      history: [],
      future: []
    },
    actions: expect.arrayContaining([
      moves[0],
      moves[1]
    ])
  });

  expect(State.dispatch({
    board: Mock.Board.fields(
      Mock.Board.field(12, Mock.piece('pawn', 'black')),
      Mock.Board.field(52, Mock.piece('pawn', 'white')),
      Mock.Board.field(44, null),
      Mock.Board.field(36, null)
    ),
    timeline: {
      history: [],
      future: []
    },
    actions: [
      moves[0],
      moves[1]
    ]
  }, moves[0])).toEqual({
    board: Mock.Board.fields(
      Mock.Board.field(12, Mock.piece('pawn', 'black')),
      Mock.Board.field(52, null),
      Mock.Board.field(44, Mock.piece('pawn', 'white')),
      Mock.Board.field(36, null)
    ),
    timeline: {
      history: [moves[0]],
      future: []
    },
    actions: expect.arrayContaining([
      {
        type: 'pick',
        field: Mock.Board.field(12, Mock.piece('pawn', 'black'))
      }
    ])
  });
});