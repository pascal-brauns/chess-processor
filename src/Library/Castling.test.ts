import * as Type from 'Type';
import * as Mock from 'Mock';
import * as Castling from './Castling';

type Castling = Type.Castling;

test('Castling.apply', () => {
  const { before, action, after } = Mock.Castling.short;
  expect(Castling.apply(before, action))
    .toEqual(after);
});

test('Castling.undo', () => {
  const { before, action, after } = Mock.Castling.short;
  expect(Castling.undo(after, action))
    .toEqual(before);
});

test('Castling.actions', () => {
  const { short, long } = Mock.Castling;
  expect(
    Castling.actions(
      Mock.Board.fields(
        ...short.before.filter(field => field.piece),
        ...long.before.filter(field => field.piece),
      ),
      { history: [], future: [] },
      {
        type: 'pick',
        field: Mock.Board.field(60, Mock.piece('king', 'white'))
      }
    )
  ).toEqual(expect.arrayContaining([long.action, short.action]));

  expect(
    Castling.actions(
      Mock.Board.fields(
        ...short.before.filter(field => field.piece),
        ...long.before.filter(field => field.piece),
        Mock.Board.field(57, Mock.piece('knight', 'white')),
      ),
      { history: [], future: [] },
      {
        type: 'pick',
        field: Mock.Board.field(60, Mock.piece('king', 'white'))
      }
    )
  ).toEqual(expect.arrayContaining([short.action]));

  expect(
    Castling.actions(
      Mock.Board.fields(
        ...short.before.filter(field => field.piece),
        ...long.before.filter(field => field.piece),
        Mock.Board.field(62, Mock.piece('knight', 'white')),
      ),
      { history: [], future: [] },
      {
        type: 'pick',
        field: Mock.Board.field(60, Mock.piece('king', 'white'))
      }
    )
  ).toEqual(expect.arrayContaining([long.action]));

  expect(
    Castling.actions(
      Mock.Board.fields(
        ...short.before.filter(field => field.piece),
        ...long.before.filter(field => field.piece),
        Mock.Board.field(57, Mock.piece('knight', 'white')),
        Mock.Board.field(62, Mock.piece('knight', 'white')),
      ),
      { history: [], future: [] },
      {
        type: 'pick',
        field: Mock.Board.field(60, Mock.piece('king', 'white'))
      }
    )
  ).toEqual([]);
});