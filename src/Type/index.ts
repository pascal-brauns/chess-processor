export * as Grid from './Grid';
import { Static } from '@sinclair/typebox';
import * as Schema from 'Schema';

export type Color = Static<typeof Schema.Color>;
export type Piece = Static<typeof Schema.Piece>;
export type Pick = Static<typeof Schema.Pick>;
export type Move = Static<typeof Schema.Move>;
export type Castling = Static<typeof Schema.Castling>;
export type Promotion = Static<typeof Schema.Promotion>;
export type Placement = Static<typeof Schema.Placement>;
export type Action = Static<typeof Schema.Action>;
export type Turn = Static<typeof Schema.Turn>;
export type Field = Static<typeof Schema.Field>;
export type Board = Static<typeof Schema.Board>;
export type Timeline = Static<typeof Schema.Timeline>;
export type State = Static<typeof Schema.State>;