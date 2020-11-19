import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../routes';

class CompanyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      companies: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.companies().orderByChild('id')
      .on('value', (snapshot) => {
        const companiesObject = snapshot.val();

        const companiesList = Object.keys(companiesObject).map((key) => ({
          ...companiesObject[key],
          uid: key,
        }));

        this.setState({
          companies: companiesList,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.companies().off();
  }

  render() {
    const { companies, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="container add-padding-bottom">
            {loading && <div>Loading ...</div>}

            <ul className="ul-comp-list">
              {companies.map((company) => (company.id === authUser.company_id &&
                <li key={company.id} className="r-details-card">
                  <strong>Title:</strong> {company.companyTitle}
                  <br />
                  <strong>Location:</strong> {company.companyAddress}
                  <br />
                  <div className="row">
                    <div className="ml-3 mr-2">
                      <Link
                        to={{
                          pathname: `${ROUTES.COMPANIES}/${company.id}`,
                          state: { company },
                        }}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(CompanyList);
