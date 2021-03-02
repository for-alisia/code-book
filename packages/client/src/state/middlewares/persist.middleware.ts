/** Dependencies */
import { Dispatch } from 'redux';

/** Redux */
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { saveCells } from '../action-creators';
import { RootState } from './../reducers/index';

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => (next: (action: Action) => void) => (action: Action) => {
  let timer: any;

  next(action);

  if (
    [
      ActionType.MOVE_CELL,
      ActionType.INSERT_CELL_AFTER,
      ActionType.UPDATE_CELL,
      ActionType.DELETE_CELL,
    ].includes(action.type)
  ) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      saveCells()(dispatch, getState);
    }, 250);
  }
};
