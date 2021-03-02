/** Dependencies */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/** Redux */
import reducers from './reducers';
import { persistMiddleware } from './middlewares/persist.middleware';

export const store = createStore(reducers, {}, applyMiddleware(thunk, persistMiddleware));
