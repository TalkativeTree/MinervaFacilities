import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class RoomItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      room: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.room) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .room(this.props.match.params.room_id)
      .on('value', (snapshot) => {
        this.setState({
          room: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.room(this.props.match.params.room_id).off();
  }

  render() {
    const { room, loading } = this.state;

    return (
      <div>
        <h5>Room ({this.props.match.params.room_id})</h5>
        {loading && <div>Loading ...</div>}

        {room && (
          <div>
            <span>
              <strong>Title:</strong> {room.roomName}
            </span>
            <br />
            <span>
              <strong>Location:</strong> {room.roomLocation}
            </span>
          </div>
        )}

        <span>
          <Link to={{ pathname: `${ROUTES.HOME}` }}>Back</Link>
        </span>
      </div>
    );
  }
}

export default withFirebase(RoomItem);
