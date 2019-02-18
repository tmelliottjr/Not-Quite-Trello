import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from 'redux-starter-kit';
import { Provider } from 'react-redux';

import { combinedReducer } from './reducers';
import App from './components/App.jsx';
import { loadState, saveState } from './localStorage';

let localData = loadState();

if (localData === undefined) {
  localData = {
    columns: {},
    tasks: {},
    columnOrder: [],
  };
}

const store = configureStore({
  reducer: combinedReducer,
  preloadedState: localData,
});

store.subscribe(() => {
  saveState({ ...store.getState(), addedColumn: null });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
