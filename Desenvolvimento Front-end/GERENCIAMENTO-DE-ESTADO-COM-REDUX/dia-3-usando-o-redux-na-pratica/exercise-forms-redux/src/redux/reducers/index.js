import { combineReducers } from 'redux';
import personalReducer from './personalReducer';
import professionalReducer from './professionalReducer';

const rootReducer = combineReducers({
  personalReducer,
  professionalReducer,
});

export default rootReducer;
