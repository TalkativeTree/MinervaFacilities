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
      limit: 5,
      companyID: this.props.companyID,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .buildings()
      .orderByChild('companyID')
      .limitToLast(this.state.limit)
      .on('value', (snapshot) => {
        const buildingsObject = snapshot.val();

        if (buildingsObject) {
          const buildingList = Object.keys(buildingsObject).map((key) => ({
            ...buildingsObject[key],
            uid: key,
          }));

          this.setState({
            buildings: buildingList,
            loading: false,
          });
        } else {
          this.setState({ buildings: null, loading: false });
        }
      });
  }

  componentWillUnmount() {
    this.props.firebase.buildings().off();
  }

  onNextPage = () => {
    this.setState((state) => ({ limit: state.limit + 5 }), this.onListenForBuildings);
  };

  render() {
    const { buildings, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="container add-padding-bottom">
            {loading && <div>Loading ...</div>}

            {!buildings ? (
              <div>There are no buildings ...</div>
            ) : (
              <div>
                {buildings.length > this.state.limit && (
                  <button className="btn btn-secondary" type="button" onClick={this.onNextPage}>
                    Show More
                  </button>
                )}

                <ul className="ul-comp-list">
                  {buildings.map(
                    (building) =>
                      building.companyID === authUser.company_id && (
                        <li key={building.uid} className="r-details-card">
                          <strong>Title:</strong> {building.buildingTitle}
                          <br />
                          <strong>Location:</strong> {building.buildingAddress}
                          <br />
                          <div className="row">
                            <div className="ml-3 mr-2">
                              <Link
                                to={{
                                  pathname: `${ROUTES.BUILDINGS}/${building.uid}`,
                                  state: { building },
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

export default withFirebase(BuildingList);
