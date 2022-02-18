import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  initialPage = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Tela de Ranking</h1>
        <button
          type="button"
          onClick={ this.initialPage }
        >
          inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
