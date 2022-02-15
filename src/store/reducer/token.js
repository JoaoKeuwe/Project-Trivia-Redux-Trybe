import { SUCESS_RESPONSE } from '../action';

const INITIAL_STATE = {
  token: '',
};

function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUCESS_RESPONSE:
    return action.token;
  default:
    return state;
  }
}

export default token;
