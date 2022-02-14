import { React, Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const mapStateToProps = (state) => {
  const { player: { name, gravatarEmail, assertions, score } } = state;
  return {
    name, gravatarEmail, assertions, score,
  };
};

class Header extends Component {
  render() {
    const { name, gravatarEmail, assertions, score } = this.props;
    return (
      <header>
        <h2>{ name }</h2>
        <img
          data-testid="header-profile-picture"
          alt="profile_image"
          src={ gravatarEmail }
        />
        <h4 data-testid="header-player-name">{ assertions }</h4>
        <h4 data-testid="header-score">{ score }</h4>
      </header>
    );
  }
}

Header.propTypes = {
  name: propTypes.string,
  gravatarEmail: propTypes.string,
  assertions: propTypes.number,
  score: propTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
