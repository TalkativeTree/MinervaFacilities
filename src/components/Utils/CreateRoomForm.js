import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROOMS } from '../../routes';

import { withFirebase } from '../Firebase';

// import AddressForm from '../AddressForm';

class RoomForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomTitle: '',
      roomAddress: '',
      companyID: '',
      buildingID: '',
      floorID: '',
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCreateRoom = () => {
    let { roomTitle, roomAddress, companyID, buildingID, floorID } = this.state;
    let ownerName = this.props.authUser.username;
    let ownerID = this.props.authUser.uid;

    var RoomData = {
      roomTitle,
      roomAddress,
      companyID,
      buildingID,
      floorID,
      owner: { ownerName, ownerID },
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    };

    let roomID = this.props.firebase.createRoom(RoomData);
    console.log(roomID);
    this.setState({
      roomTitle: '',
      roomAddress: '',
      companyID: '',
      buildingID: '',
      floorID: '',
    });
  };

  render() {
    const { roomTitle, roomAddress, companyID, buildingID, floorID } = this.state;

    return (
      <div className="add-padding-bottom text-center">
        <h1>Create A Room!</h1>
        <form>
          <input
            className="col-10 form-input"
            type="text"
            placeholder="Name Your Room!"
            value={roomTitle}
            name="roomTitle"
            onChange={this.onChange}
          />
          <input
            className="col-10 form-input"
            type="text"
            placeholder="Where does it live?"
            value={roomAddress}
            name="roomAddress"
            onChange={this.onChange}
          />
          <input
            className="col-10 form-input"
            type="text"
            placeholder="What Is Your Company ID?"
            value={companyID}
            name="companyID"
            onChange={this.onChange}
          />
          <input
            className="col-10 form-input"
            type="text"
            placeholder="What Is Your Building ID?"
            value={buildingID}
            name="buildingID"
            onChange={this.onChange}
          />
          <input
            className="col-10 form-input"
            type="text"
            placeholder="What Is Your Floor ID?"
            value={floorID}
            name="floorID"
            onChange={this.onChange}
          />

          {/* <AddressForm parentCallBack={this.onChangeroomAddress} /> */}
        </form>

        <button className="btn btn-primary" type="submit" onClick={this.onCreateRoom}>
          <Link to={ROOMS}>click me to send back</Link>
        </button>
      </div>
    );
  }
}

export default withFirebase(RoomForm);
