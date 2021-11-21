import * as Type from 'Type';

type Action = Type.Action;
type Color = Type.Color;
type Timeline = Type.Timeline;
type Cartesian = Type.Grid.Cartesian;

export const opposite = (color: Color): Color => (
  color === 'white'
    ? 'black'
    : 'white'
);

export const field = ({ x, y }: Cartesian) => (
  x % 2 === 0 && y % 2 === 0 ||
  x % 2 !== 0 && y % 2 !== 0
    ? 'white'
    : 'black'
);

export const turn = (timeline: Timeline) => (
  timeline.history.length % 2 === 0
    ? 'white'
    : 'black'
);

export const winner = (timeline: Timeline, actions: Action[]) => (
  timeline.history.length && !actions.length
    ? opposite(turn(timeline))
    : null
);