import { combineReducers } from 'redux';
import token from './token';
import player from './player';

const rootReducer = combineReducers({ token, player });

export default rootReducer;
