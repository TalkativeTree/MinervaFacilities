import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../routes';

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

    this.props.firebase.floors().orderByChild('companyID')
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
  }

  componentWillUnmount() {
    this.props.firebase.floors().off();
  }

  render() {
    const { floors, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="container add-padding-bottom">
            {loading && <div>Loading ...</div>}

            <ul className="ul-comp-list">
              {floors.map((floor) => (floor.companyID === authUser.company_id &&
                <li key={floor.id} className="r-details-card">
                  <strong>Title:</strong> {floor.floorName}
                  <br />
                  <strong>Location:</strong> {floor.floorLocation}
                  <br />
                  <div className="row">
                    <div className="ml-3 mr-2">
                      <Link to={{ pathname: `${ROUTES.FLOORS}/${floor.id}`, state: { floor } }}>Details</Link>
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

export default withFirebase(FloorList);
