/** Dependencies */
import { Dispatch } from 'redux';

/** Models */
import { ActionType } from './../action-types';
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Action,
} from './../actions';
import { CellTypes, Direction } from './../cell';

/** Utils */
import bundle from '../../bundler';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return { type: ActionType.UPDATE_CELL, payload: { id, content } };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return { type: ActionType.DELETE_CELL, payload: id };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return { type: ActionType.MOVE_CELL, payload: { id, direction } };
};

export const insertCellAfter = (id: string | null, type: CellTypes): InsertCellAfterAction => {
  return { type: ActionType.INSERT_CELL_AFTER, payload: { id, type } };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.BUNDLE_START, payload: { cellId } });

    /** Bundle the code */
    const result = await bundle(input);

    dispatch({ type: ActionType.BUNDLE_COMPLETE, payload: { cellId, bundle: result } });
  };
};
