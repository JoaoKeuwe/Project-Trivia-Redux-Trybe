import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import { fetchQuestionsApi } from '../services/triviaApi';
import { getToken } from '../store/action';

const NUMBER_RANDOM = 0.5;
const RESPONSE_CODE = 3;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      Allquestions: [],
      numberQuestion: 0,
      answers: [],
      isFetching: false,
    };
  }

  componentDidMount() {
    this.getQuestionsApi();
  }

  getQuestionsApi = async () => {
    const { tokenState, loginToken } = this.props;
    console.group(tokenState);
    const questionsReturn = await fetchQuestionsApi(tokenState);
    // Se o TOKEN expirar, a API retorna um RESPONSE_CODE = 3 -> no else é solicitando um novo TOKEN
    if (questionsReturn.response_code === RESPONSE_CODE) {
      console.log(questionsReturn);
      //  localStorage.clear();
      loginToken();
      this.getQuestionsApi();
    } else {
      console.log(questionsReturn);
      // Coloca todas as respostas em um único Array;
      const allAnswers = [
        questionsReturn.results[0].correct_answer,
        ...questionsReturn.results[0].incorrect_answers];
      const answersWithDataTestId = [];
      // Coloca todas as respostas com seu respectivo DataTestId em um Array para criar o Random;
      allAnswers.map((answer, index) => {
        if (index === 0) {
          answersWithDataTestId.push({ answer, dataTestId: 'correct-answer' });
          return answersWithDataTestId;
        }
        answersWithDataTestId.push({ answer, dataTestId: `wrong-answer-${index - 1}` });
        return answersWithDataTestId;
      });
      // Embaralha o conteúdo do array de respostas
      // Parte do código retirado de: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      const randomAnswers = answersWithDataTestId.sort(
        () => Math.random() - NUMBER_RANDOM,
      );
      this.setState({
        Allquestions: questionsReturn.results,
        answers: randomAnswers,
        isFetching: true,
      });
    }
  }

  render() {
    const { Allquestions, numberQuestion, isFetching, answers } = this.state;
    return (
      <main>
        <Header />
        {isFetching && (
          <div>
            <h2 data-testid="question-category">
              {Allquestions[numberQuestion].category}
            </h2>
            <h1 data-testid="question-text">{Allquestions[numberQuestion].question}</h1>
            <div data-testid="answer-options">
              {answers.map(({ answer, dataTestId }, index) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ dataTestId }
                >
                  {answer}
                </button>))}
            </div>
          </div>
        )}
      </main>
    );
  }
}

Game.propTypes = {
  tokenState: propTypes.string,
  loginToken: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  loginToken: () => dispatch(getToken()),
});

const mapStateToProps = (state) => ({
  tokenState: state.token.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
