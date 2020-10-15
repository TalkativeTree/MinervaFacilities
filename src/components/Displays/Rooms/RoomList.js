import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      rooms: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.rooms().on('value', (snapshot) => {
      const roomsObject = snapshot.val();

      const roomsList = Object.keys(roomsObject).map((key) => ({
        ...roomsObject[key],
        uid: key,
      }));

      this.setState({
        rooms: roomsList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.rooms().off();
  }

  render() {
    const { rooms, loading } = this.state;

    return (
      <div className="add-padding-bottom">
        <h2>Room List</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              <span>
                <strong>Title:</strong> {room.roomName}
              </span>
              <br />
              <span>
                <strong>Location:</strong> {room.roomLocation}
              </span>
              <br />
              <span>
                <Link
                  to={{
                    pathname: `${ROUTES.ROOMS}/${room.id}`,
                    state: { room },
                  }}
                >
                  Details
                </Link>
              </span>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withFirebase(RoomList);
