import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../routes';

class BuildingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      buildings: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    var userID = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.user(userID).on('value', (snapshot) => {
      const user = snapshot.val();
      const usersCompany = user.company_id;
      // console.log(userID, usersCompany);

      this.props.firebase.buildings()
        .orderByChild('companyID')
        .equalTo(usersCompany)
        .on('value', (snapshot) => {
          const buildingsObject = snapshot.val();

          const buildingsList = Object.keys(buildingsObject).map((key) => ({
            ...buildingsObject[key],
            uid: key,
          }));

          this.setState({
            buildings: buildingsList,
            loading: false,
          });
        });
    });
  }

  componentWillUnmount() {
    this.props.firebase.buildings().off();
  }

  render() {
    const { buildings, loading } = this.state;

    return (
      <div className="add-padding-bottom">
        {/* {company.companyTitle}'s */}
        <h2>Building List</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {buildings.map((building) => (
            <li key={building.id}>
              <strong>Title:</strong> {building.buildingTitle}
              <br />
              <strong>Location:</strong> {building.buildingAddress}
              <br />
              <div className="row">
                <div className="ml-3 mr-2">
                  <Link
                    to={{
                      pathname: `${ROUTES.BUILDINGS}/${building.id}`,
                      state: { building },
                    }}
                  >
                    Details
                  </Link>
                </div>

                {/* <div className="ml-2">
                  <Link to={{ pathname: `${ROUTES.FLOORS}/${building.id}`, state: { building } }}>
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

export default withFirebase(BuildingList);
