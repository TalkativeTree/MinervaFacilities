import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import { AuthUserContext } from '../../Session';
import * as ROUTES from '../../../routes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


class RoomDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      room: null,
      editMode: false,
      companyID: '',
      roomTitle: '',
      roomAddress: '',
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.room) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase.room(this.props.match.params.id).on('value', (snapshot) => {
      this.setState({
        room: snapshot.val(),
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.room(this.props.match.params.id).off();
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      companyID: this.state.companyID,
      buildingID: this.state.buildingID,
      floorID: this.state.floorID,
      roomTitle: this.state.room.roomTitle,
      roomAddress: this.state.room.roomAddress,
    }));
  };

  onSaveEdit = () => {
    const { room, roomTitle, roomAddress } = this.state;
    const { uid, ...roomSnapshot } = room;

    this.props.firebase.room(room.uid).set({
      ...roomSnapshot,
      roomTitle,
      roomAddress,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ editMode: false });
  };

  onRemoveRoom = (uid) => {
    this.props.firebase.room(uid).remove();
  };

  render() {
    const { loading, room, editMode, roomTitle, roomAddress } = this.state;

    const fullDateCreated = new Date(room.createdAt * 1000).toString().split(' ');
    const dateCreated =
      fullDateCreated[0] +
      ', ' +
      fullDateCreated[1] +
      ' ' +
      fullDateCreated[2] +
      ', ' +
      fullDateCreated[4] +
      ', ' +
      fullDateCreated[6] +
      fullDateCreated[7] +
      fullDateCreated[8];

    const fullDateEdited = new Date(room.editedAt * 1000).toString().split(' ');
    const dateEdited =
      fullDateEdited[0] +
      ', ' +
      fullDateEdited[1] +
      ' ' +
      fullDateEdited[2] +
      ', ' +
      fullDateEdited[4] +
      ', ' +
      fullDateEdited[6] +
      fullDateEdited[7] +
      fullDateEdited[8];

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="container">
            {loading && <div>Loading ...</div>}

            {room && (
              <div>
                <h5>Room ({room.uid})</h5>
                <strong>Title:</strong> {room.roomTitle}
                <br />
                <strong>Location:</strong> {room.roomAddress}
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

            {authUser.uid === room.owner.ownerID && (
              <div className="">
                {editMode ? (
                  <div>
                    <div>
                      <input
                        type="text"
                        className="col-10 form-input"
                        placeholder="Room Name?"
                        name="roomTitle"
                        value={roomTitle}
                        onChange={this.onChange}
                      />
                      <input
                        placeholder="Room Location/Number?"
                        type="text"
                        className="col-10 form-input"
                        name="roomAddress"
                        value={roomAddress}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className="justify-me">
                      <button className="btn btn-secondary btn-bot" onClick={this.onSaveEdit}>
                        Save
                      </button>
                      <button className="btn btn-secondary btn-bot" onClick={this.onToggleEditMode}>
                        Reset
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <button className="btn-li" onClick={this.onToggleEditMode}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>

                    <button type="button" className="btn-li" onClick={() => this.onRemoveRoom(room.uid)}>
                      <Link to={ROUTES.ROOMS}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Link>
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="row justify-me">
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
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(RoomDetails);
