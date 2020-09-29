import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import FloorList from "./FloorList";

class Floors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      buildingID: this.props.buildingID,
      floors: [],
      limit: 5,

      title: '',
      address: '',
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
      .floors(this.state.buildingID)
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

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  onCreateFloor = (event, authUser) => {
    this.props.firebase.floors(this.state.buildingID).push({
      title: this.state.title,
      address: this.state.address,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({
      title: '',
      address: '',
    });

    event.preventDefault();
  };

  onEditFloor = (floor, title, address) => {
    const { uid, ...floorSnapshot } = floor;

    this.props.firebase.floor(this.state.buildingID, floor.uid).set({
      ...floorSnapshot,
      title,
      address,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveFloor = (uid) => {
    this.props.firebase.floor(this.state.buildingID, uid).remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForFloors,
    );
  };

  render() {
    const { title, address, floors, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
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

            {!floors && <div>There are no floors ...</div>}

            <form
              onSubmit={(event) =>
                this.onCreateFloor(event, authUser)
              }
            >
              <input
                type="text"
                placeholder="Floor Name?"
                value={title}
                onChange={this.onChangeTitle}
              />
              <input
                className="ml10"
                placeholder="Floor Location/Number?"
                type="address"
                value={address}
                onChange={this.onChangeAddress}
              />

              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Floors);
