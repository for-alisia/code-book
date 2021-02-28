export type CellTypes = 'code' | 'text';

/** Directions, where cells can be moved */
export type Direction = 'up' | 'down';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}
