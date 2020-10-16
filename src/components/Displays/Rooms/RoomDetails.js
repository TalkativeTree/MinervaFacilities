import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

class RoomDetails extends Component {
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
      .room(this.props.match.params.id)
      .on('value', (snapshot) => {
        this.setState({
          room: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.room(this.props.match.params.id).off();
  }

  render() {
    const { room, loading } = this.state;

    return (
      <div>
        <h5>Room ({room.id})</h5>
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
            <br />
            <span>
              <strong>Company ID:</strong> {room.companyID}
            </span>
            <br />
            <span>
              <strong>Building ID:</strong> {room.buildingID}
            </span>
            <br />
            <span>
              <strong>Floor ID:</strong> {room.floorID}
            </span>
            <br />
            <span>
              <strong>Created At:</strong> {room.createdAt}
            </span>
            <br />
            <span>
              <strong>Last Edited At:</strong> {room.editedAt}
            </span>
          </div>
        )}

        <span>
          <Link to={{ pathname: `${ROUTES.HOME}`, state: room}}>Create Report</Link>
        </span>
      </div>
    );
  }
}

export default withFirebase(RoomDetails);
