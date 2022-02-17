export const fetchQuestionsApi = (token) => {
  const questionsRequest = fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((data) => data);
  return questionsRequest;
};

export const fetchTokenApi = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const tokenRequest = await response.json();

  localStorage.setItem('token', JSON.stringify(tokenRequest));
  return tokenRequest;
};
