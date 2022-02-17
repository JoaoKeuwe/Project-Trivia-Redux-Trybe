import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { fetchQuestionsApi } from '../../services/triviaApi';
import { getToken, sumScore } from '../../store/action';
import './Game.css';

const NUMBER_RANDOM = 0.5;
const INVALID_TOKEN_RESPONSE = 3;
const CORRECT_ANSWER = 'correct-answer';
const ONE_SECOND = 1000;
const TIME_LIMIT = -1;
const POINTS_OF_DIFFICULTY = { hard: 3, medium: 2, easy: 1 };
const HIT_POINTS = 10;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      Allquestions: [],
      numberQuestion: 0,
      answers: [],
      btnDisabled: false,
      nextQuestion: false,
      seconds: 30,
      timeIsUp: false,
    };

    this.getQuestionsApi = this.getQuestionsApi.bind(this);
    this.saveQuestions = this.saveQuestions.bind(this);
    this.shufflingQuestions = this.shufflingQuestions.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.limitTime = this.limitTime.bind(this);
    this.sumBtnQuestions = this.sumBtnQuestions.bind(this);
    this.nextQuestionBtn = this.nextQuestionBtn.bind(this);
  }

  componentDidMount() {
    this.getQuestionsApi();
    // this.setTimer();
  }

  componentDidUpdate(prevProps) {
    const { tokenState } = this.props;
    if (tokenState !== prevProps.tokenState) {
      this.getQuestionsApi();
    }
  }

  setTimer() {
    this.intervalId = setInterval(() => {
      this.setState(
        (prevState) => ({
          seconds: prevState.seconds - 1,
        }),
        () => this.limitTime(),
      );
    }, ONE_SECOND);
  }

  getQuestionsApi = async () => {
    const { loginToken } = this.props;
    const tokenLocalStorage = localStorage.getItem('token');
    const questionsReturn = await fetchQuestionsApi(tokenLocalStorage);

    if (questionsReturn.response_code === INVALID_TOKEN_RESPONSE) {
      loginToken();
    } else {
      this.saveQuestions(questionsReturn);
    }
  };

  saveQuestions = (questionsReturn) => {
    this.setState({
      Allquestions: questionsReturn.results,
    }, () => this.shufflingQuestions());
  };

  shufflingQuestions = () => {
    const { Allquestions, numberQuestion } = this.state;

    // Coloca todas as respostas em um único Array;
    const allAnswers = [
      Allquestions[numberQuestion].correct_answer,
      ...Allquestions[numberQuestion].incorrect_answers,
    ];
    const answersWithDataTestId = [];
    // Coloca todas as respostas com seu respectivo DataTestId em um Array para criar o Random;
    allAnswers.map((answer, index) => {
      if (index === 0) {
        answersWithDataTestId.push({ answer, dataTestId: CORRECT_ANSWER });
        return answersWithDataTestId;
      }
      answersWithDataTestId.push({
        answer,
        dataTestId: `wrong-answer-${index - 1}`,
      });
      return answersWithDataTestId;
    });

    // Embaralha o conteúdo do array de respostas
    // Parte do código retirado de: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    const randomAnswers = answersWithDataTestId.sort(
      () => Math.random() - NUMBER_RANDOM,
    );

    this.setState({
      answers: randomAnswers,
      seconds: 30,
      timeIsUp: false,
    }, () => this.setTimer());
  }

  limitTime() {
    const { seconds } = this.state;
    if (seconds === TIME_LIMIT) {
      this.setState({
        btnDisabled: true,
        timeIsUp: true,
        nextQuestion: true,
      });
      clearInterval(this.intervalId);
    }
  }

  sumBtnQuestions({ target }) {
    const { seconds, Allquestions, numberQuestion } = this.state;
    const { handleScore } = this.props;

    this.setState({
      btnDisabled: true,
      nextQuestion: true,
    });
    clearInterval(this.intervalId);

    const answerOptions = document.querySelector('#answer-options');
    answerOptions.classList.add('allQuestions');

    if (target.id === CORRECT_ANSWER) {
      const difficulty = POINTS_OF_DIFFICULTY[Allquestions[numberQuestion].difficulty];
      const pointsSecond = seconds * difficulty;
      const totalValue = HIT_POINTS + pointsSecond;

      handleScore(totalValue);
    }
  }

  nextQuestionBtn() {
    const answerOptions = document.querySelector('#answer-options');
    answerOptions.classList.remove('allQuestions');

    this.setState((prevState) => ({
      numberQuestion: prevState.numberQuestion + 1,
      btnDisabled: false,
    }), () => this.shufflingQuestions());
  }

  render() {
    const {
      Allquestions,
      numberQuestion,
      answers,
      btnDisabled,
      nextQuestion,
      seconds,
      timeIsUp,
    } = this.state;
    const { scoreState } = this.props;
    return (
      <main>
        <Header />
        {Allquestions.length > 0 && (
          <div>
            <h2>{`Pontuação total: ${scoreState}`}</h2>
            <section>
              {timeIsUp ? (
                <h2>Acabou o Tempo</h2>
              ) : (
                <h2>{`Voce tem... ${seconds} para responder`}</h2>
              )}
            </section>
            <h2 data-testid="question-category">
              {Allquestions[numberQuestion].category}
            </h2>
            <h1 data-testid="question-text">
              {Allquestions[numberQuestion].question}
            </h1>
            <div data-testid="answer-options" id="answer-options">
              {answers.map(({ answer, dataTestId }, index) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ dataTestId }
                  id={ dataTestId }
                  disabled={ btnDisabled }
                  className={
                    dataTestId === CORRECT_ANSWER ? 'btn-correct' : 'btn-false'
                  }
                  onClick={ (evt) => this.sumBtnQuestions(evt) }
                >
                  {answer}
                </button>
              ))}
            </div>
            {nextQuestion && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.nextQuestionBtn() }
              >
                Next (Poxima pergunta)
              </button>
            )}
          </div>
        )}
      </main>
    );
  }
}

Game.propTypes = {
  tokenState: propTypes.string,
  scoreState: propTypes.number,
  loginToken: propTypes.func,
  handleScore: propTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  tokenState: state.token,
  scoreState: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  loginToken: () => dispatch(getToken()),
  handleScore: (points) => dispatch(sumScore(points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
