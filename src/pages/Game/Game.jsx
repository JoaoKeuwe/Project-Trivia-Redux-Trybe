import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { fetchQuestionsApi } from '../../services/triviaApi';
import { getToken } from '../../store/action';
import './Game.css';

const NUMBER_RANDOM = 0.5;
const INVALID_TOKEN_RESPONSE = 3;
const ONE_SECOND = 1000;
const TIME_LIMIT = -1;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      Allquestions: [],
      numberQuestion: 0,
      answers: [],
      btnDisabled: false,
      seconds: 30,
      timeIsUp: false,
    };

    this.getQuestionsApi = this.getQuestionsApi.bind(this);
    this.shufflingQuestions = this.shufflingQuestions.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.limitTime = this.limitTime.bind(this);
  }

  componentDidMount() {
    this.getQuestionsApi();
    this.setTimer();
  }

  componentDidUpdate(prevProps) {
    const { tokenState } = this.props;
    if (tokenState !== prevProps.tokenState) {
      this.getQuestionsApi();
    }
  }

  setTimer() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }), () => this.limitTime());
    }, ONE_SECOND);
  }

  getQuestionsApi = async () => {
    const { loginToken } = this.props;
    const tokenLocalStorage = localStorage.getItem('token');
    const questionsReturn = await fetchQuestionsApi(tokenLocalStorage);

    if (questionsReturn.response_code === INVALID_TOKEN_RESPONSE) {
      loginToken();
    } else {
      this.shufflingQuestions(questionsReturn);
    }
  }

  shufflingQuestions = (questionsReturn) => {
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
    });
  }

  limitTime() {
    const { seconds } = this.state;
    if (seconds === TIME_LIMIT) {
      this.setState({
        btnDisabled: true,
        timeIsUp: true,
      });
      clearInterval(this.intervalId);
    }
  }

  disableBtnQuestions(evt) {
    this.setState({ btnDisabled: true });
    console.log(evt.target);
    const answerOptions = document.querySelector('#answer-options');
    answerOptions.classList.add('allQuestions');
    console.log(answerOptions);
  }

  render() {
    const {
      Allquestions,
      numberQuestion,
      answers,
      btnDisabled,
      seconds,
      timeIsUp,
    } = this.state;
    return (
      <main>
        <Header />
        {Allquestions.length > 0 && (
          <div>
            <section>
              {(timeIsUp)
                ? <h2>Acabou o Tempo</h2>
                : <h2>{`Voce tem... ${seconds} para responder`}</h2>}
            </section>
            <h2 data-testid="question-category">
              {Allquestions[numberQuestion].category}
            </h2>
            <h1 data-testid="question-text">{Allquestions[numberQuestion].question}</h1>
            <div
              data-testid="answer-options"
              id="answer-options"
            >
              {answers.map(({ answer, dataTestId }, index) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ dataTestId }
                  id={ dataTestId }
                  disabled={ btnDisabled }
                  className={ (dataTestId === 'correct-answer')
                    ? 'btn-correct' : 'btn-false' }
                  onClick={ (evt) => this.disableBtnQuestions(evt) }
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

const mapStateToProps = (state) => ({
  tokenState: state.token,
  // scoreState: state.pl
});

const mapDispatchToProps = (dispatch) => ({
  loginToken: () => dispatch(getToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
