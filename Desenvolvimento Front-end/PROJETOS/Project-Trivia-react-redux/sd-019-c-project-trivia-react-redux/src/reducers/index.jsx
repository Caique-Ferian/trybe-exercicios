import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import game from './game';

const rootReducer = combineReducers({
  player,
  token,
  game,
});

export default rootReducer;
