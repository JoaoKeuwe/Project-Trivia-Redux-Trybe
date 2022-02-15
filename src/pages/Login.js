import React from 'react';
import PropTypes from 'prop-types';
/* import {login} from '../store/action'; */

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginEmail: '',
      loginName: '',
      isLoginButtonDisabled: true,
    };
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.loginButtonDisabled = this.loginButtonDisabled.bind(this);
    this.initGame = this.initGame.bind(this);
  }

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  handleOnInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.loginButtonDisabled());
  }

  loginButtonDisabled() {
    const { loginEmail, loginName } = this.state;
    const MIN_LENGTH = 1;
    if (loginEmail.length >= MIN_LENGTH && loginName.length >= MIN_LENGTH) {
      this.setState({ isLoginButtonDisabled: false });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  }

  async initGame() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    const { history } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
    history.push('/game');
  }

  render() {
    const {
      loginEmail,
      loginName,
      isLoginButtonDisabled,
    } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-player-name">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              id="input-player-name"
              name="loginName"
              value={ loginName }
              onChange={ this.handleOnInputChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Email:
            <input
              type="email"
              data-testid="input-gravatar-email"
              id="input-gravatar-email"
              name="loginEmail"
              value={ loginEmail }
              onChange={ this.handleOnInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            name="isSaveButtonDisabled"
            disabled={ isLoginButtonDisabled }
            onClick={ this.initGame }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettings }

          >

            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
