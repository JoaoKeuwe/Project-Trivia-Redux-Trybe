export const LOGIN = 'LOGIN';
export const SUCESS_RESPONSE = 'SUCESS_RESPONSE';
export const SUM_OF_POINTS = 'SUM_OF_POINTS';

export function login(name, email) {
  return {
    type: LOGIN,
    name,
    email,
  };
}

export function sucessResponse(token) {
  return {
    type: SUCESS_RESPONSE,
    token,
  };
}

export function getToken() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const { token } = await response.json();
      localStorage.setItem('token', token);
      dispatch(sucessResponse(token));
    } catch (error) {
      console.log(error);
    }
  };
}

export function sumScore(points) {
  return {
    type: SUM_OF_POINTS,
    points,
  };
}
