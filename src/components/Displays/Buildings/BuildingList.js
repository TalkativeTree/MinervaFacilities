import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../../Session';
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

    this.props.firebase.buildings().orderByChild('companyID')
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
  }

  componentWillUnmount() {
    this.props.firebase.buildings().off();
  }

  render() {
    const { buildings, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="container add-padding-bottom">
            {loading && <div>Loading ...</div>}

            <ul className="ul-comp-list">
              {buildings.map((building) => (building.companyID === authUser.company_id &&
                <li key={building.id} className="r-details-card">
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

export default withFirebase(BuildingList);
