import * as Dimension from './Dimension';

export * as Dimension from './Dimension';

export type Cartesian = {
  x: number;
  y: number;
};

export type Polarity = {
  x: Dimension.Polarity;
  y: Dimension.Polarity;
};

export type Orientation = (
  'horizontal' |
  'vertical' |
  'ascending' |
  'descending'
);

export type Line = {
  length: number;
  polarity: Polarity;
};