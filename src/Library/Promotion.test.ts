import * as Type from 'Type';
import * as Mock from 'Mock';
import * as Promotion from './Promotion';

type Promotion = Type.Promotion;

const { before, action, after } = Mock.Promotion;

test('Promotion.apply', () => {
  expect(Promotion.apply(before, action))
    .toEqual(after);
});

test('Promotion.undo', () => {
  expect(Promotion.undo(after, action))
    .toEqual(before);
});