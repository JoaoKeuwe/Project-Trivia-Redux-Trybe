export const LOGIN = 'LOGIN';
export const SUCESS_RESPONSE = 'SUCESS_RESPONSE';

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
      const token = await response.json();
      console.log(token);
      localStorage.setItem('token', JSON.stringify(token));
      dispatch(sucessResponse(token.token));
    } catch (error) {
      console.log(error);
    }
  };
}

// export const getApiToken = async () => {
//   const response = await fetch("https://opentdb.com/api_token.php?command=request");
//   const data = await response.json();
//   return data;
// };
