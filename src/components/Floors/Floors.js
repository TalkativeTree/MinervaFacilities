import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import FloorList from "./FloorList";

class Floors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      companyID: this.props.companyID,
      buildingID: this.props.buildingID,
      floors: [],
      limit: 5,

      floorTitle: '',
      floorAddress: '',
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
      .floors(this.state.companyID, this.state.buildingID)
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
    this.setState({ floorTitle: event.target.value });
  };

  onChangeFloorAddress = (event) => {
    this.setState({ floorAddress: event.target.value });
  };

  onCreateFloor = (event, authUser) => {
    this.props.firebase
      .floors(this.state.companyID, this.state.buildingID)
      .push({
        floorTitle: this.state.floorTitle,
        floorAddress: this.state.floorAddress,
        userId: authUser.uid,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
      });

    this.setState({
      floorTitle: '',
      floorAddress: '',
    });

    event.preventDefault();
  };

  onEditFloor = (floor, floorTitle, floorAddress) => {
    const { uid, ...floorSnapshot } = floor;

    this.props.firebase
      .floor(this.state.companyID, this.state.buildingID, floor.uid)
      .set({
        ...floorSnapshot,
        floorTitle,
        floorAddress,
        editedAt: this.props.firebase.serverValue.TIMESTAMP,
      });
  };

  onRemoveFloor = (uid) => {
    this.props.firebase
      .floor(this.state.companyID, this.state.buildingID, uid)
      .remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForFloors,
    );
  };

  render() {
    const { floorTitle, floorAddress, floors, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => authUser.roles.companyRole === "ADMIN" || "MANAGER" ? (
          <div>
            {!loading && floors && (
              <button type="button" onClick={this.onNextPage}>
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

            {!floors && <div>There are no floors yet...</div>}

            <form
              onSubmit={(event) =>
                this.onCreateFloor(event, authUser)
              }
            >
              <input
                type="text"
                placeholder="Floor Name?"
                value={floorTitle}
                onChange={this.onChangeFloorTitle}
              />
              <input
                placeholder="Floor Location/Number?"
                type="text"
                value={floorAddress}
                onChange={this.onChangeFloorAddress}
              />

              <button type="submit">Send</button>
            </form>
          </div>
        ) : (
          <div>
            {!loading && floors && (
              <button type="button" onClick={this.onNextPage}>
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

            {!floors && <div>There are no floors for your Company/Building...</div>}

          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Floors);
