/** Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

/** Components */
import App from './app/app.component';

/** Redux */
import { store } from './state';

/** Styles */
import 'bulmaswatch/superhero/bulmaswatch.min.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
