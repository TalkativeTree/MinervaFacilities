import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../routes';

import { CreateFloorForm } from '../../Utils';

class FloorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      floors: [],
      limit: 5,
      companyID: this.props.companyID,
      buildingID: this.props.buildingID,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .floors()
      .orderByChild('companyID')
      .limitToLast(this.state.limit)
      .on('value', (snapshot) => {
        const floorsObject = snapshot.val();

        if (floorsObject) {
          const floorList = Object.keys(floorsObject).map((key) => ({
            ...floorsObject[key],
            uid: key,
          }));

          this.setState({
            floors: floorList,
            loading: false,
          });
        } else {
          this.setState({ floors: null, loading: false });
        }
      });
  }

  componentWillUnmount() {
    this.props.firebase.floors().off();
  }

  onNextPage = () => {
    this.setState((state) => ({ limit: state.limit + 5 }), this.onListenForFloors);
  };

  render() {
    const { floors, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="container add-padding-bottom">
            {loading && <div>Loading ...</div>}

            {!floors ? (
              <div>There are no floors for your Company/Building...</div>
            ) : (
              <div>
                {floors.length > this.state.limit && (
                  <button className="btn btn-secondary btn-bot" type="button" onClick={this.onNextPage}>
                    More
                  </button>
                )}

                <ul className="ul-comp-list">
                  {floors.map(
                    (floor) =>
                      floor.companyID === authUser.company_id && (
                        <li key={floor.uid} className="r-details-card">
                          <strong>Title:</strong> {floor.floorTitle}
                          <br />
                          <strong>Location:</strong> {floor.floorAddress}
                          <br />
                          <div className="row">
                            <div className="ml-3 mr-2">
                              <Link to={{ pathname: `${ROUTES.FLOORS}/${floor.uid}`, state: { floor } }}>Details</Link>
                            </div>
                          </div>
                          <hr />
                        </li>
                      ),
                  )}
                </ul>
              </div>
            )}

            {authUser.roles === 'ADMIN' && <CreateFloorForm authUser={authUser} />}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(FloorList);
