/** Dependencies */
import { Dispatch } from 'redux';
import axios from 'axios';

/** Models */
import { ActionType } from './../action-types';
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Action,
} from './../actions';
import { CellTypes, Direction, Cell } from './../cell';
import { RootState } from './../reducers';

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

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');

      dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
    } catch (err) {
      dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: err.message });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();
    const cells = order.map((id) => data[id]);
    try {
      await axios.post('/cells', { cells });
    } catch (err) {
      dispatch({ type: ActionType.SAVE_CELLS_ERROR, payload: err.message });
    }
  };
};
