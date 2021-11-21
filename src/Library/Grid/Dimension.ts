import * as Type from 'Type';

type Polarity = Type.Grid.Dimension.Polarity;

export const polarize = (polarity: Polarity) => {
  switch (polarity) {
    case '-': return -1;
    case '0': return 0;
    case '+': return 1;
    /* istanbul ignore next */
    default: return null;
  }
};

export const boundary = (value: number, polarity: Polarity, max: number) => (
  polarity === '+'
    ? max - value
    : value
);

export const between = (from: number, to: number): number[] => (
  from > to
    ? between(to, from).reverse()
    : (
      Array((Math.abs(to - from)) - 1)
        .fill(null)
        .map((_, index) => from + index + 1)
    )
);