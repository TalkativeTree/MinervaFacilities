import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../routes';

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

    this.props.firebase.rooms().orderByChild('companyID')
      .on('value', (snapshot) => {
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
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="container add-padding-bottom">
            {loading && <div>Loading ...</div>}

            <ul className="ul-comp-list">
              {rooms.map((room) => room.companyID === authUser.company_id && (
                <li key={room.id}>
                  <strong>Title:</strong> {room.roomName}
                  <br />
                  <strong>Location:</strong> {room.roomLocation}
                  <br />
                  <Link to={{ pathname: `${ROUTES.ROOMS}/${room.id}`, state: { room } }}>Details</Link>
                  <hr />
                </li>
                ),
              )}
            </ul>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(RoomList);
