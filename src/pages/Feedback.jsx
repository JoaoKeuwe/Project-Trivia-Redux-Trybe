import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const MIN_ASSERTIONS = 3;

class Feedback extends React.Component {
  constructor() {
    super();

    this.redirectLogin = this.redirectLogin.bind(this);
    this.redirectRanking = this.redirectRanking.bind(this);
  }

  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  redirectRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <header>
          <h2 data-testid="header-score">{ score }</h2>
        </header>
        <main>
          <section>
            {
              assertions < MIN_ASSERTIONS
                ? <p data-testid="feedback-text">Could be better...</p>
                : <p data-testid="feedback-text">Well Done!</p>
            }
          </section>
          <section>
            <p data-testid="feedback-total-score">{score}</p>
            <p data-testid="feedback-total-question">{ assertions }</p>
            <button
              data-testid="btn-play-again"
              type="submit"
              onClick={ () => this.redirectLogin() }
            >
              Play Again
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => this.redirectRanking() }
            >
              Ranking
            </button>
          </section>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
