import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../routes';

import { CreateRoomForm } from '../../Utils';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      rooms: [],
      limit: 5,
      companyID: this.props.companyID,
      buildingID: this.props.buildingID,
      floorID: this.props.floorID,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .rooms()
      .orderByChild('companyID')
      .limitToLast(this.state.limit)
      .on('value', (snapshot) => {
        const roomsObject = snapshot.val();

        if (roomsObject) {
          const roomsList = Object.keys(roomsObject).map((key) => ({
            ...roomsObject[key],
            uid: key,
          }));

          this.setState({
            rooms: roomsList,
            loading: false,
          });
        } else {
          this.setState({ floors: null, loading: false });
        }
      });
  }

  componentWillUnmount() {
    this.props.firebase.rooms().off();
  }

  onNextPage = () => {
    this.setState((state) => ({ limit: state.limit + 5 }), this.onListenForFloors);
  };

  render() {
    const { rooms, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="container add-padding-bottom">
            {loading && <div>Loading ...</div>}

            {!rooms ? (
              <div>There are no Rooms for your Building/Floor...</div>
            ) : (
              <div>
                {rooms.length > this.state.limit && (
                  <button className="btn btn-secondary btn-bot" type="button" onClick={this.onNextPage}>
                    More
                  </button>
                )}

                <ul className="ul-comp-list">
                  {rooms.map(
                    (room) =>
                      room.companyID === authUser.company_id && (
                        <li key={room.uid}>
                          <strong>Title:</strong> {room.roomTitle}
                          <br />
                          <strong>Location:</strong> {room.roomAddress}
                          <br />
                          <Link to={{ pathname: `${ROUTES.ROOMS}/${room.uid}`, state: { room } }}>Details</Link>
                          <hr />
                        </li>
                      ),
                  )}
                </ul>
              </div>
            )}

            {authUser.roles === 'ADMIN' && <CreateRoomForm authUser={authUser} />}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(RoomList);
