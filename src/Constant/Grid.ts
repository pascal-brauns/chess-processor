import * as Type from '../Type';

type Polarity = Type.Grid.Polarity;

export const horizontal: Polarity[] = [
  { x: '+', y: '0' },
  { x: '-', y: '0' },
];

export const vertical: Polarity[] = [
  { x: '0', y: '+' },
  { x: '0', y: '-' },
];

export const ascending: Polarity[] = [
  { x: '+', y: '+' },
  { x: '-', y: '-' },
];

export const descending: Polarity[] = [
  { x: '+', y: '-' },
  { x: '-', y: '+' },
];