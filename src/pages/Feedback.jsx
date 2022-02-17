import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const MIN_ASSERTIONS = 3;

class Feedback extends React.Component {
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
        <main>
          <section>
            {
              Number(assertions) < MIN_ASSERTIONS
                ? <p data-testid="feedback-text">Could be better...</p>
                : <p data-testid="feedback-text">Well done!</p>
            }
            <p data-tesid="feedback-total-question">
              acertos:
              { assertions }
            </p>
          </section>
          <section>
            <p data-testid="feedback-total-score">
              pontos:
              { score }
            </p>
            <button
              data-testid="btn-play-again"
              type="submit"
              onClick={ this.redirectLogin() }
            >
              Play Again
            </button>
            <button
              type="button"
              data-testid="ranking-title"
              onClick={ this.redirectRanking }
            >
              VER RANKING

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
