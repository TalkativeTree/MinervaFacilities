import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

class FloorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      floors: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    var userID = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.user(userID).on('value', (snapshot) => {
      const user = snapshot.val();
      const usersCompany = user.company_id;
      // console.log(userID, usersCompany);

      this.props.firebase.floors()
        .orderByChild('companyID')
        .equalTo(usersCompany)
        .on('value', (snapshot) => {
          const floorsObject = snapshot.val();

          const floorsList = Object.keys(floorsObject).map((key) => ({
            ...floorsObject[key],
            uid: key,
          }));

          this.setState({
            floors: floorsList,
            loading: false,
          });
        });
    });
  }

  componentWillUnmount() {
    this.props.firebase.floors().off();
  }

  render() {
    const { floors, loading } = this.state;

    return (
      <div className="add-padding-bottom">
        {/* <h2>Floor List</h2> */}
        {loading && <div>Loading ...</div>}
        <ul className="ul-comp-list">
          {floors.map((floor) => (
            <li key={floor.id} className="r-details-card">
              <strong>Title:</strong> {floor.floorName}<br />
              <strong>Location:</strong> {floor.floorLocation}<br />

              <div className="row">
                <div className="ml-3 mr-2">
                  <Link to={{ pathname: `${ROUTES.FLOORS}/${floor.id}`, state: { floor } }}>
                    Details
                  </Link>
                </div>

                {/* <div className="ml-2">
                  <Link to={{ pathname: `${ROUTES.ROOMS}/${floor.id}`, state: { floor } }}>
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

export default withFirebase(FloorList);
