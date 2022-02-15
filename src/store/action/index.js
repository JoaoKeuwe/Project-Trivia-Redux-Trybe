export const LOGIN = 'LOGIN';
export const SUCESS_RESPONSE = 'SUCESS_RESPONSE';

export function login(name, email) {
  return {
    type: LOGIN,
    name,
    email,
  };
}

function sucessResponse(token) {
  return {
    type: SUCESS_RESPONSE,
    token,
  };
}

export function getToken() {
  return async (dispeatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const token = await response.json();
      localStorage.setItem('token', JSON.stringify(token));
      dispeatch(sucessResponse(token.token));
    } catch (error) {
      console.log(error);
    }
  };
}
