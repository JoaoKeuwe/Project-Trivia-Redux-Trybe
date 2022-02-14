// import { React, Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// const MIN_ASSERTIONS = 3;

// class Feedback extends Component {
//   redirectLogin() {
//     const { history } = this.props;
//     history.push('/');
//   }

//   render() {
//     const { assertions, name, score, picture } = this.props;
//     return (
//       <header>
//         <section>
//           <img
//             src={ picture }
//             data-testid="header-profile-picture"
//             alt="Imagem do Jogador"
//           />
//           <h2 data-testid="header-player-name">{ name }</h2>
//         </section>
//         <section>
//           <p data-testid="header-score">{ score }</p>
//         </section>
//         <section>
//           {
//             Number(assertions) < MIN_ASSERTIONS
//               ? <p data-testid="feedback-text">Could be better...</p>
//               : <p data-testid="feedback-text">Well done!</p>
//           }
//           <p data-tesid="feedback-total-question">{ assertions }</p>
//         </section>
//         <section>
//           <p data-testid="feedback-total-score">{ score }</p>
//           <button
//             data-testid="btn-play-again"
//             type="submit"
//             onClick={ this.redirectLogin() }
//           >
//             Play Again
//           </button>
//         </section>
//       </header>
//     );
//   }
// }

// Feedback.propTypes = {
//   assertions: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   score: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// };

// const mapStateToProps = (state) => ({
//   // assertions: state.player.assertions,
//   name: state.ranking.name,
//   picture: state.ranking.score,
//   score: state.ranking.score,
// });

// export default connect(mapStateToProps)(Feedback);
