import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../routes';

const JoinCompanyPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <h3>Join A Company</h3>
        <JoinCompanyForm authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const INITIAL_STATE = {
  companyID: '',
  error: null,
};

class CompanyFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { authUser } = this.props;
    const { companyID } = this.state;

    this.props.firebase
      .setUserCompany(authUser.uid, companyID)
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
    const { companyID, error } = this.state;

    const isInvalid = companyID === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="form-input"
          name="companyID"
          autoComplete="companyID"
          value={this.state.companyID}
          onChange={this.onChange}
          type="text"
          placeholder="Company ID"
        />
        <button className="btn btn-primary" disabled={isInvalid} type="submit">
          Join This Company
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const CompanyLink = () => (
  <p>
    <Link to={ROUTES.JOIN_A_COMPANY}>Join A Company!!</Link>
  </p>
);

export default JoinCompanyPage;

const JoinCompanyForm = withFirebase(CompanyFormBase);

export { JoinCompanyForm, CompanyLink };
