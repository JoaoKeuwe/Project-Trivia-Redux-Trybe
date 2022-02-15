export const LOGIN = 'LOGIN';

const action = (value) => ({
  type: 'CLICK_UPDATE_VALUE',
  newValue: value,
});

export function login({ name, email }) {
  return {
    type: LOGIN,
    name,
    email,
  };
}

export default action;
