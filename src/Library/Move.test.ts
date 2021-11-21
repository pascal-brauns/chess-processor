import * as Mock from 'Mock';
import * as Move from './Move';

const { move, hit } = Mock.Move;

test('Move.apply', () => {
  expect(Move.apply(move.before, move.action))
    .toEqual(move.after);

  expect(Move.apply(hit.before, hit.action))
    .toEqual(hit.after);
});

test('Move.undo', () => {
  expect(Move.undo(move.after, move.action))
    .toEqual(move.before);

  expect(Move.undo(hit.after, hit.action))
    .toEqual(hit.before);
});