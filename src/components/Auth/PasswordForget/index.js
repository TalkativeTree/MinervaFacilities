import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

const PasswordForgetPage = () => (
  <div className="page-bg">
        <div className="page-inner">
    <h1>Reset Password</h1>
    <PasswordForgetForm />
    <BackButton />

    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      
      <form onSubmit={this.onSubmit}>
        <input
          className="form-input"
          name="email"
          autoComplete="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button 
        className="btn btn-secondary btn-social"
        disabled={isInvalid} type="submit">
          Reset Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
      
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET} className="highlight-link">Forgot Password?</Link>
  </p>
);

const BackButton = withRouter(({ history }) => {
  return (
    <div>
      <button className="btn btn-primary btn-social" onClick={() => history.goBack()}><FontAwesomeIcon icon={faChevronLeft} /> Go Back</button>
    </div>
  )
});

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink, BackButton };
