/** Dependencies */
import { combineReducers } from 'redux';

/** Reducers */
import cellReducer from './cellReducer';

const reducers = combineReducers({
  cells: cellReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
