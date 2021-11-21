import * as Type from 'Type';

type Cartesian = Type.Grid.Cartesian;

export const cartesian = (index: number): Cartesian => ({
  x: index % 8,
  y: Math.floor(index / 8)
});

export const index = (x: number, y: number) => y * 8 + x;

export const combine = (...cartesians: Cartesian[]) => cartesians.reduce(
  (combined, cartesian) => ({
    x: combined.x + cartesian.x,
    y: combined.y + cartesian.y
  }),
  { x: 0, y: 0 }
);