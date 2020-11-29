import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HOME } from '../../routes';

import { withFirebase } from '../Firebase';

// import AddressForm from '../AddressForm';

class BuildingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buildingTitle: '',
      buildingAddress: '',
      companyID: '',
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCreateBuilding = () => {
    let { buildingTitle, buildingAddress, companyID } = this.state;
    let ownerName = this.props.authUser.username;
    let ownerID = this.props.authUser.uid;

    var BuildingData = {
      buildingTitle,
      buildingAddress,
      companyID,
      owner: { ownerName, ownerID },
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    };

    let buildingID = this.props.firebase.createBuilding(BuildingData);
    console.log(buildingID);
    this.setState({
      buildingTitle: '',
      buildingAddress: '',
      companyID: '',
    });
  };

  render() {
    const { buildingTitle, buildingAddress, companyID } = this.state;

    return (
      <div className="add-padding-bottom text-center">
        <h1>Create A Building!</h1>
        <form>
          <input
            className="col-10 form-input"
            type="text"
            placeholder="Name Your Building!"
            value={buildingTitle}
            name="buildingTitle"
            onChange={this.onChange}
          />
          <input
            className="col-10 form-input"
            type="text"
            placeholder="Where does it live?"
            value={buildingAddress}
            name="buildingAddress"
            onChange={this.onChange}
          />
          <input
            className="col-10 form-input"
            type="text"
            placeholder="What Your Company ID?"
            value={companyID}
            name="companyID"
            onChange={this.onChange}
          />

          {/* <AddressForm parentCallBack={this.onChangebuildingAddress} /> */}
        </form>

        <button className="btn btn-primary" type="submit" onClick={this.onCreateBuilding}>
          <Link to={HOME}>click me to send back</Link>
        </button>
      </div>
    );
  }
}

export default withFirebase(BuildingForm);
