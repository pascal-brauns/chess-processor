import * as Type from 'Type';
import * as Action from './Action';
import * as Board from './Board';
import * as Castling from './Castling';
import * as Color from './Color';
import * as Modifier from './Modifier';
import * as Move from './Move';

type Board = Type.Board;
type Color = Type.Color;
type Pick = Type.Pick;
type Action = Type.Action;
type Timeline = Type.Timeline;
type Move = Type.Move;
type Castling = Type.Castling;
type Placement = Type.Placement;

export const placements = (board: Board, timeline: Timeline, pick: Pick = null): Placement[] => (
  pick
    ? (
      [Modifier.actions(pick, board), Castling.actions(board, timeline, pick)]
        .flat()
        .filter(valid(board, Color.turn(timeline)))
    )
    : []
);

export const picks = (board: Board, timeline: Timeline): Pick[] => (
  Board.player(board, Color.turn(timeline))
    .map(Action.pick)
    .filter(pick => placements(board, timeline, pick).length > 0)
);

export const actions = (board: Board, timeline: Timeline, pick: Pick = null) => (
  [picks(board, timeline), placements(board, timeline, pick)]
    .flat()
    .reduce<Record<number, Action>>(
      (actions, action) => {
        actions[Action.target(action)] = action;
        return actions;
      },
      Array(64).fill(null)
    )
);

const valid = (board: Board, turn: Color) => (
  (action: Action) => Board.valid(
    apply(board, action),
    turn
  )
);

const apply = (board: Board, action: Action) => {
  switch (action.type) {
    case 'move': return Move.apply(board, action);
    case 'castling': return Castling.apply(board, action);
    case 'promotion': return Move.apply(board, action.move);
    /* istanbul ignore next */
    default: return board;
  }
};