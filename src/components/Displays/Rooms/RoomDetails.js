import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../routes';

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

    const fullDateCreated = new Date(room.createdAt * 1000).toString().split(' ');
    const dateCreated =
      fullDateCreated[0] + ', ' + fullDateCreated[1] + ' ' + fullDateCreated[2] + ', ' +
      fullDateCreated[4] + ', ' + fullDateCreated[6] + fullDateCreated[7] + fullDateCreated[8];

    const fullDateEdited = new Date(room.editedAt * 1000).toString().split(' ');
    const dateEdited =
      fullDateEdited[0] + ', ' + fullDateEdited[1] + ' ' + fullDateEdited[2] + ', ' +
      fullDateEdited[4] + ', ' + fullDateEdited[6] + fullDateEdited[7] + fullDateEdited[8];

    return (
      <div className="container">
        {loading && <div>Loading ...</div>}

        {room && (
          <div>
            <h5>Room ({room.id})</h5>
            <strong>Title:</strong> {room.roomName}
            <br />
            <strong>Location:</strong> {room.roomLocation}
            <br />
            <strong>Company ID:</strong> {room.companyID}
            <br />
            <strong>Building ID:</strong> {room.buildingID}
            <br />
            <strong>Floor ID:</strong> {room.floorID}
            <br />
            <strong>Created At:</strong> {dateCreated}
            <br />
            {room.editedAt && (
              <p>
                <strong>Last Edited At:</strong> {dateEdited}
              </p>
            )}
          </div>
        )}

        <div className="row">
          <div className="ml-3 mr-2">
            <Link to={ROUTES.ROOMS}>
              <button className="btn btn-secondary">Back</button>
            </Link>
          </div>
          <div className="mr-2">
            <Link to={{ pathname: `${ROUTES.REPORTS}`, state: room }}>
              <button className="btn btn-success">Create Report</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(RoomDetails);
