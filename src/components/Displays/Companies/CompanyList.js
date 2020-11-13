import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    var userID = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.user(userID).on('value', (snapshot) => {
      const user = snapshot.val();
      const usersCompany = user.company_id;
      // console.log(userID, usersCompany);

      this.props.firebase.companies()
        .orderByChild('id')
        .equalTo(usersCompany)
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
    });
  }

  componentWillUnmount() {
    this.props.firebase.companies().off();
  }

  render() {
    const { companies, loading } = this.state;

    return (
      <div className="add-padding-bottom">
        {/* {company.companyTitle}'s */}
        <h2>Company List</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {companies.map((company) => (
            <li key={company.id}>
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

                {/* <div className="ml-2">
                  <Link to={{ pathname: `${ROUTES.FLOORS}/${company.id}`, state: { company } }}>
                    Rooms / Spaces
                  </Link>
                </div> */}
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withFirebase(CompanyList);
