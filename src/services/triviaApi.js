export const fetchQuestionsApi = (token) => {
  const questionsRequest = fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((data) => data);
  return questionsRequest;
};

export const fetchTokenApi = () => {
  const tokenRequest = fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => data);
  return tokenRequest;
};
