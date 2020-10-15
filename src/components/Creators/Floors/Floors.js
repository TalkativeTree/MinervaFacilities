import React, { Component } from 'react';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import FloorList from './FloorList';

class Floors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      companyID: this.props.companyID,
      buildingID: this.props.buildingID,
      floors: [],
      limit: 5,

      floorName: '',
      floorLocation: '',
      rooms: { r1: 'main-room' },
      members: [],
    };
  }

  componentDidMount() {
    this.onListenForFloors();
  }

  onListenForFloors = () => {
    this.setState({ loading: true });

    this.props.firebase
      .floors()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', (snapshot) => {
        const floorObject = snapshot.val();

        if (floorObject) {
          const floorList = Object.keys(floorObject).map((key) => ({
            ...floorObject[key],
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
  };

  componentWillUnmount() {
    this.props.firebase.floors().off();
  }

  onChangeFloorTitle = (event) => {
    this.setState({ floorName: event.target.value });
  };

  onChangeFloorAddress = (event) => {
    this.setState({ floorLocation: event.target.value });
  };

  onCreateFloor = (event, authUser) => {
    this.props.firebase
      .floors()
      .push({
        floorName: this.state.floorName,
        floorLocation: this.state.floorLocation,
        userId: authUser.uid,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
      });

    this.setState({
      floorName: '',
      floorLocation: '',
    });

    event.preventDefault();
  };

  onEditFloor = (floor, floorName, floorLocation) => {
    const { uid, ...floorSnapshot } = floor;

    this.props.firebase
      .floor(floor.uid)
      .set({
        ...floorSnapshot,
        floorName,
        floorLocation,
        editedAt: this.props.firebase.serverValue.TIMESTAMP,
      });
  };

  onRemoveFloor = (uid) => {
    this.props.firebase
      .floor(uid)
      .remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForFloors,
    );
  };

  render() {
    const { floorName, floorLocation, floors, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser.roles.companyRole === 'OWNER' ||
          authUser.roles.companyRole === 'MANAGER' ? (
            <div className="text-center">
              <h4 className="text-center">Floors List</h4>

              {!loading && floors && (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={this.onNextPage}
                >
                  Show More
                </button>
              )}

              {loading && <div>Loading ...</div>}

              {floors && (
                <FloorList
                  authUser={authUser}
                  floors={floors}
                  onEditFloor={this.onEditFloor}
                  onRemoveFloor={this.onRemoveFloor}
                />
              )}

              {!floors && <div>There are no floors yet...</div>}

              <form
                onSubmit={(event) =>
                  this.onCreateFloor(event, authUser)
                }
              >
                <div className="container">
                  <input
                    type="text"
                    className="col-10 form-input"
                    placeholder="Floor Name?"
                    value={floorName}
                    onChange={this.onChangeFloorTitle}
                  />
                  <input
                    className="col-10 form-input"
                    placeholder="Floor Location/Number?"
                    type="text"
                    value={floorLocation}
                    onChange={this.onChangeFloorAddress}
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" type="submit">
                    Add Floor
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h4 className="text-center">Floors List</h4>

              {!loading && floors && (
                <button
                  className="btn btn-secondary btn-bot"
                  type="button"
                  onClick={this.onNextPage}
                >
                  More
                </button>
              )}

              {loading && <div>Loading ...</div>}

              {floors && (
                <FloorList
                  authUser={authUser}
                  floors={floors}
                  onEditFloor={this.onEditFloor}
                  onRemoveFloor={this.onRemoveFloor}
                />
              )}

              {!floors && (
                <div>
                  There are no floors for your Company/Building...
                </div>
              )}
            </div>
          )
        }
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Floors);
