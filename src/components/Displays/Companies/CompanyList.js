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
      limit: 5,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .companies()
      .orderByChild('id')
      .limitToLast(this.state.limit)
      .on('value', (snapshot) => {
        const companyObject = snapshot.val();

        if (companyObject) {
          const companyList = Object.keys(companyObject).map((key) => ({
            ...companyObject[key],
            uid: key,
          }));

          this.setState({
            companies: companyList,
            loading: false,
          });
        } else {
          this.setState({ companies: null, loading: false });
        }
      });
  }

  componentWillUnmount() {
    this.props.firebase.companies().off();
  }

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForCompanies,
    );
  };


  render() {
    const { companies, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="container add-padding-bottom">
            {loading && <div>Loading ...</div>}
            
            {!companies ? (
              <div>There are no companies ...</div>
            ) : (
              <div>
                {companies.length > this.state.limit && (
                  <button className="btn btn-secondary" type="button" onClick={this.onNextPage}>
                    Show More
                  </button>
                )}

                <ul className="ul-comp-list">
                  {companies.map(
                    (company) =>
                      company.uid === authUser.company_id && (
                        <li key={company.uid} className="r-details-card">
                          <strong>Title:</strong> {company.companyTitle}
                          <br />
                          <strong>Location:</strong> {company.companyAddress}
                          <br />
                          <div className="row">
                            <div className="ml-3 mr-2">
                              <Link
                                to={{
                                  pathname: `${ROUTES.COMPANIES}/${company.uid}`,
                                  state: { company },
                                }}
                              >
                                Details
                              </Link>
                            </div>
                          </div>
                          <hr />
                        </li>
                      ),
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(CompanyList);
