import * as Type from 'Type';
import * as Color from './Color';

type Color = Type.Color;
type Move = Type.Move;
type Timeline = Type.Timeline;

const move = (color: Color, from: number, to: number): Move => ({
  type: 'move',
  from: {
    index: from,
    piece: {
      type: 'pawn',
      id: '<ID>',
      color,
    }
  },
  to: {
    index: to,
  }
});

const timeline = (history: Move[]): Timeline => ({
  history,
  future: []
});

test('Color.opposite', () => {
  expect(Color.opposite('white')).toEqual('black');
  expect(Color.opposite('black')).toEqual('white');
});

test('Color.field', () => {
  expect(Color.field({ x: 0, y: 0 })).toEqual('white');
  expect(Color.field({ x: 1, y: 0 })).toEqual('black');
  expect(Color.field({ x: 2, y: 0 })).toEqual('white');
  expect(Color.field({ x: 3, y: 0 })).toEqual('black');

  expect(Color.field({ x: 0, y: 1 })).toEqual('black');
  expect(Color.field({ x: 1, y: 1 })).toEqual('white');
  expect(Color.field({ x: 2, y: 1 })).toEqual('black');
  expect(Color.field({ x: 3, y: 1 })).toEqual('white');
});

test('Color.turn', () => {
  expect(Color.turn(timeline([])))
    .toEqual('white');

  expect(Color.turn(timeline([move('white', 51, 43)])))
    .toEqual('black');

  expect(
    Color.turn(timeline([
      move('white', 51, 43),
      move('black', 12, 27)
    ]))
  ).toEqual('white');
});

test('Color.winner', () => {
  expect(Color.winner(timeline([]), []))
    .toEqual(null);

  expect(Color.winner(
    timeline([move('white', 51, 43)]),
    [move('black', 12, 27)]
  )).toEqual(null);

  expect(Color.winner(
    timeline([move('white', 51, 43)]),
    []
  )).toEqual('white');

  expect(Color.winner(
    timeline([move('white', 51, 43), move('black', 12, 27)]),
    []  
  )).toEqual('black');
});