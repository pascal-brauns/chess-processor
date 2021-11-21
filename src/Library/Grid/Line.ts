import * as Type from 'Type';
import * as Constant from 'Constant';
import * as Dimension from './Dimension';
import * as Position from './Position';

type Polarity = Type.Grid.Polarity;
type Line = Type.Grid.Line;
type Cartesian = Type.Grid.Cartesian;
type Orientation = Type.Grid.Orientation;

const cartesian = (value: number, polarity: Polarity) => ({
  x: value * Dimension.polarize(polarity.x),
  y: value * Dimension.polarize(polarity.y)
});

export const cartesians = (line: Line) => (
  Array(line.length)
    .fill(null)
    .map((_, index) => cartesian(index + 1, line.polarity))
);

export const absolute = (anchor: Cartesian, cartesians: Cartesian[]) => (
  cartesians
    .map(cartesian => Position.combine(anchor, cartesian))
);

export const draw = (
  index: number,
  orientation: Orientation,
  max: Cartesian
): Cartesian[][] => {
  const root = Position.cartesian(index);
  const length = (polarity: Polarity) => {
    switch (orientation) {
      case 'ascending':
      case 'descending':
        return Math.min(
          Dimension.boundary(root.x, polarity.x, max.x),
          Dimension.boundary(root.y, polarity.y, max.y),
        );
      case 'horizontal':
      case 'vertical':
        const active = (
          (Object
            .keys(polarity) as (keyof Polarity)[])
            .find(key => polarity[key] === '+' || polarity[key] === '-')
        );
        return Dimension.boundary(
          root[active],
          polarity[active],
          orientation === 'horizontal'
            ? max.x
            : max.y
        );
      /* istanbul ignore next */
      default: return null;
    }
  }

  return (
    Constant.Grid[orientation]
      .map(polarity => ({
        length: length(polarity),
        polarity
      }))
      .map(cartesians)
  );
}