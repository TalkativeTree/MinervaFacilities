import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';


class CompanyDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      company: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.company) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .company(this.props.match.params.id)
      .on('value', (snapshot) => {
        this.setState({
          company: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.company(this.props.match.params.id).off();
  }

  render() {
    const { company, loading } = this.state;

    return (
      <div>
        <h4>Company ({company.id})</h4>
        {loading && <div>Loading ...</div>}

        {company && (
          <div>
            <strong>Title:</strong> {company.companyTitle}
            <br />
            <strong>Location:</strong> {company.companyAddress}
            <br />
            <strong>Company Owner:</strong> {company.ownerID}
            <br />
            <strong>Created At:</strong> {company.createdAt}
            <br />
            <strong>Last Edited At:</strong> {company.editedAt}
            <br />
            <strong>Buildings List:</strong> {company.buildingsList}
          </div>
        )}

        <div className='row'>
          <div className="ml-3 mr-2">
            <Link to={ROUTES.COMPANIES}>Back</Link>
          </div>
          <div className="mr-2">
            <Link to={ROUTES.BUILDINGS}>Buildings List</Link>
          </div>
        </div>

      </div>
    );
  }
}

export default withFirebase(CompanyDetail);
