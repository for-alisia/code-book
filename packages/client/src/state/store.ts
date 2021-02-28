/** Dependencies */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/** Redux */
import reducers from './reducers';

import { ActionType } from './action-types/index';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { id: null, type: 'code' },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { id: null, type: 'text' },
});

console.log(store.getState());
