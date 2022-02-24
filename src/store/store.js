import { applyMiddleware, compose, createStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { rootReducer } from './reducers';

//const instrumenter = window.__REDUX_DEVTOOLS_EXTENSION__();
export const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(rootReducer),
  compose(applyMiddleware(thunkMiddleware, routerMiddleware(history)))
);

export { store };
