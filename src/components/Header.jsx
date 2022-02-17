import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
    emailHash = (userEmail) => {
      const hash = md5(userEmail).toString();
      const url = `https://www.gravatar.com/avatar/${hash}`;
      return url;
    };

    render() {
      const { name, email } = this.props;
      return (
        <div>
          <img
            data-testid="header-profile-picture"
            alt="profile_image"
            src={ this.emailHash(email) }
          />
          <p data-testid="header-player-name">
            {' '}
            Nome :
            { name }
          </p>
          <h4 data-testid="header-score">0</h4>
        </div>
      );
    }
}

Header.propTypes = {
  name: propTypes.string,
  email: propTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
