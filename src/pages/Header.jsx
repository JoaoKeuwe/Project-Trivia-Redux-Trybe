import { React, Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email } = this.props;

    const emailHash = (userEmail) => {
      const hash = md5(userEmail).toString();
      const url = `https://www.gravatar.com/avatar/${hash}`;
      return url;
    };

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="profile_image"
          src={ emailHash(email) }
        />
        <p data-testid="header-player-name">
          {' '}
          Nome :
          { name }
        </p>
        <h4 data-testid="header-score">0</h4>
      </header>
    );
  }
}

Header.propTypes = {
  name: propTypes.string,
  email: propTypes.string,
}.isRequired;

/* const mapStateToProps = ({}) => ({
    name:
    email:
}) */

export default connect(mapStateToProps)(Header);
