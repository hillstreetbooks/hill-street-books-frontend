import { combineReducers } from 'redux';
import userReducer from './userSlice';
import authorContentReducer from './authorcontentSlice';

const rootReducer = combineReducers({
  user: userReducer,
  authorContent: authorContentReducer
});

export { rootReducer };
