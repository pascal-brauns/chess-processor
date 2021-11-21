import * as Type from 'Type';
export * as Board from './Board';
export * as Castling from './Castling';
export * as Move from './Move';
export * as Promotion from './Promotion';
export * as Timeline from './Timeline';

type Color = Type.Color;
type Piece = Type.Piece;

export const piece = (
  type: Piece['type'],
  color: Color,
  id = '<ID>'
): Piece => ({
  type,
  id,
  color,
});