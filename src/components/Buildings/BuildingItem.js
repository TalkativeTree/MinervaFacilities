import React, { Component } from 'react';
import Floors from '../Floors';

class BuildingItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyID: this.props.companyID,
      editMode: false,
      editBuildingTitle: this.props.building.buildingTitle,
      editBuildingAddress: this.props.building.buildingAddress,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      companyID: this.props.companyID,
      editBuildingTitle: this.props.building.buildingTitle,
      editBuildingAddress: this.props.building.buildingAddress,
    }));
  };

  onChangeEditBuildingTitle = (event) => {
    this.setState({ editBuildingTitle: event.target.value });
  };

  onChangeEditBuildingAddress = (event) => {
    this.setState({ editBuildingAddress: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditBuilding(
      this.props.building,
      this.state.editBuildingTitle,
      this.state.editBuildingAddress,
    );

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, building, onRemoveBuilding } = this.props;
    const { companyID, editMode, editBuildingTitle, editBuildingAddress } = this.state;

    return (
      <li>
        {editMode ? (
          <span>
            <input
              type="text"
              placeholder="Name Your Building!"
              value={editBuildingTitle}
              onChange={this.onChangeEditBuildingTitle}
            />
            <input
              type="text"
              placeholder="Where does it live?"
              value={editBuildingAddress}
              onChange={this.onChangeEditBuildingAddress}
            />

            <h3>Floors</h3>
            <Floors
              companyID={companyID}
              buildingID={building.uid}
            />
          </span>
        ) : (
          <span>
            {/* {building.ownerID} */}
            <strong>{building.buildingTitle}</strong>
            {building.buildingAddress}
            {building.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {authUser.uid === building.ownerID && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveBuilding(building.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default BuildingItem;
