import { LOGIN } from '../action';

const INITIAL_STATE = {
  email: '',
  name: '',
};

function loginState(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  default:
    return state;
  }
}

export default loginState;
