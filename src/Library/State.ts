import * as Type from 'Type';
import * as Constant from 'Constant';
import * as Action from './Action';
import * as Board from './Board';
import * as Timeline from './Timeline';
import * as Turn from './Turn';

type Action = Type.Action;
type Board = Type.Board;
type Field = Type.Field;
type Piece = Type.Piece;
type State = Type.State;
type Timeline = Type.Timeline;

/* istanbul ignore next */
export const initial = (): State => {
  const board = (
    (Constant.Board.initial as Piece[])
      .map<Field>((piece, index) => ({
        index,
        piece,
        action: null
      }))
  );

  const timeline: Timeline = {
    history: [],
    future: []
  };
  return {
    board,
    timeline,
    actions: Turn.picks(board, timeline),
  }
};

export const undo = (state: State): State => {
  const board = Board.undo(state.board, state.timeline.history[0]);
  const timeline = Timeline.backward(state.timeline);
  return {
    board,
    timeline,
    actions: Turn.picks(board, timeline)
  };
};

export const redo = (state: State): State => {
  const board = Board.apply(state.board, state.timeline.future[0]);
  const timeline = Timeline.forward(state.timeline);
  return {
    board,
    timeline,
    actions: Turn.picks(board, timeline)
  };
};

export const dispatch = (state: State, action: Action): State => {
  const board = Board.apply(state.board, action);
  const timeline = Timeline.dispatch(state.timeline, action);
  return {
    board,
    timeline,
    actions: (
      action.type === 'pick'
        ? Turn.placements(board, timeline, action)
        : Turn.picks(board, timeline)
    ),
  };
}