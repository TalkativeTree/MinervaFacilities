import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../routes';


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

    const fullDateCreated = new Date(company.createdAt * 1000).toString().split(' ');
    const dateCreated =
      fullDateCreated[0] + ', ' + fullDateCreated[1] + ' ' + fullDateCreated[2] + ', ' +
      fullDateCreated[4] + ', ' + fullDateCreated[6] + fullDateCreated[7] + fullDateCreated[8];

    const fullDateEdited = new Date(company.editedAt * 1000).toString().split(' ');
    const dateEdited =
      fullDateEdited[0] + ', ' + fullDateEdited[1] + ' ' + fullDateEdited[2] + ', ' +
      fullDateEdited[4] + ', ' + fullDateEdited[6] + fullDateEdited[7] + fullDateEdited[8];

    return (
      <div className="container">
        {loading && <div>Loading ...</div>}

        {company && (
          <div>
            <h5>Company ({company.id})</h5>
            <strong>Title:</strong> {company.companyTitle}
            <br />
            <strong>Location:</strong> {company.companyAddress}
            <br />
            <strong>Company Owner:</strong> {company.ownerID}
            <br />
            <strong>Created At:</strong> {dateCreated}
            <br />
            {company.editedAt && (
              <p>
                <strong>Last Edited At:</strong> {dateEdited}
              </p>
            )}
            <br />
            <strong>Buildings List:</strong> {company.buildingsList}
          </div>
        )}

        <div className="row">
          <div className="ml-3 mr-2">
            <Link to={ROUTES.COMPANIES}>
              <button className="btn btn-secondary">Back</button>
            </Link>
          </div>
          <div className="mr-2">
            <Link to={{ pathname: `${ROUTES.BUILDINGS}`, state: company }}>
              <button className="btn btn-success">Buildings List</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(CompanyDetail);
