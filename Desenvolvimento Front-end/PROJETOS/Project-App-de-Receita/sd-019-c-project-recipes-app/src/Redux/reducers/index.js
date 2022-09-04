// eslint-disable-next-line import/no-unresolved
import { combineReducers } from 'redux';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({
  apiReducer,
});

export default rootReducer;
