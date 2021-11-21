import * as Type from 'Type';
import * as Action from './Action';

type Timeline = Type.Timeline;
type Action = Type.Action;
type Piece = Type.Piece;

export const backward = (timeline: Timeline) => ({
  history: timeline.history.slice(1),
  future: [timeline.history[0], ...timeline.future],
});

export const forward = (timeline: Timeline) => ({
  history: [timeline.future[0], ...timeline.history],
  future: timeline.future.slice(1)
});

const push = (timeline: Timeline, action: Action): Timeline => ({
  future: [],
  history: [action, ...timeline.history]
});

export const dispatch = (timeline: Timeline, action: Action) => (
  action.type === 'pick'
    ? timeline
    : push(timeline, action)
);

export const initial = (timeline: Timeline, pieces: Piece[]) => (
  pieces.every(piece => (
    timeline.history
      .every(action => Action.piece(action).id !== piece.id)
  ))
);