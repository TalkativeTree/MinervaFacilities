import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FLOORS } from '../../routes';

import { withFirebase } from '../Firebase';

// import AddressForm from '../AddressForm';

class FloorForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      floorTitle: '',
      floorAddress: '',
      companyID: '',
      buildingID: '',
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCreateFloor = () => {
    let { floorTitle, floorAddress, companyID, buildingID } = this.state;
    let ownerName = this.props.authUser.username;
    let ownerID = this.props.authUser.uid;

    var FloorData = {
      floorTitle,
      floorAddress,
      companyID,
      buildingID,
      owner: { ownerName, ownerID },
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    };

    let floorID = this.props.firebase.createFloor(FloorData);
    console.log(floorID);
    this.setState({
      floorTitle: '',
      floorAddress: '',
      companyID: '',
      buildingID: '',
    });
  };

  render() {
    const { floorTitle, floorAddress, companyID, buildingID } = this.state;

    return (
      <div className="add-padding-bottom text-center">
        <h1>Create A Floor!</h1>
        <form>
          <input
            className="col-10 form-input"
            type="text"
            placeholder="Name Your Floor!"
            value={floorTitle}
            name="floorTitle"
            onChange={this.onChange}
          />
          <input
            className="col-10 form-input"
            type="text"
            placeholder="Where does it live?"
            value={floorAddress}
            name="floorAddress"
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

          {/* <AddressForm parentCallBack={this.onChangefloorAddress} /> */}
        </form>

        <button className="btn btn-primary" type="submit" onClick={this.onCreateFloor}>
          <Link to={FLOORS}>click me to send back</Link>
        </button>
      </div>
    );
  }
}

export default withFirebase(FloorForm);
