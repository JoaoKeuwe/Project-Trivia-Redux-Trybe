import { combineReducers } from 'redux';
import token from './token';
import loginState from './login';

const rootReducer = combineReducers({ token, loginState });

export default rootReducer;
