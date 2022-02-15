export const LOGIN = 'LOGIN';

export function login(name, email) {
  return {
    type: LOGIN,
    name,
    email,
  };
}
