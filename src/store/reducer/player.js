import { LOGIN, SUM_OF_POINTS } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      gravatarEmail: action.email,
      name: action.name,
    };
  case SUM_OF_POINTS:
    return {
      ...state,
      score: state.score + action.points,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}

export default player;
