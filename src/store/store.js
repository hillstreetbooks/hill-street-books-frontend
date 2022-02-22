import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export { store };
