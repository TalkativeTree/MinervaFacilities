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
            <strong>Title:</strong> {room.roomName}<br />
            <strong>Location:</strong> {room.roomLocation}<br />
            <strong>Company ID:</strong> {room.companyID}<br />
            <strong>Building ID:</strong> {room.buildingID}<br />
            <strong>Floor ID:</strong> {room.floorID}<br />
            <strong>Created At:</strong> {room.createdAt}<br />
            <strong>Last Edited At:</strong> {room.editedAt}
          </div>
        )}

        <div className="row">
          <div className="ml-3 mr-2">
            <Link to={ROUTES.ROOMS}>Back</Link>
          </div>
          <div className="mr-2">
            <Link to={{ pathname: `${ROUTES.HOME}`, state: room}}>Create Report</Link>
          </div>
        </div>

      </div>
    );
  }
}

export default withFirebase(RoomDetails);
