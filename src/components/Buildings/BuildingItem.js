import React, { Component } from 'react';
import Floors from '../Floors';

class BuildingItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editTitle: this.props.building.title,
      editAddress: this.props.building.address,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editTitle: this.props.building.title,
      editAddress: this.props.building.address,
    }));
  };

  onChangeEditTitle = (event) => {
    this.setState({ editTitle: event.target.value });
  };

  onChangeEditAddress = (event) => {
    this.setState({ editAddress: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditBuilding(
      this.props.building,
      this.state.editTitle,
      this.state.editAddress,
    );

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, building, onRemoveBuilding } = this.props;
    const { editMode, editTitle, editAddress } = this.state;

    return (
      <li>
        {editMode ? (
          <span>
            <input
              type="text"
              placeholder="Name Your Building!"
              value={editTitle}
              onChange={this.onChangeEditTitle}
            />
            <input
              className="ml10"
              type="address"
              placeholder="Where does it live?"
              value={editAddress}
              onChange={this.onChangeEditAddress}
            />

            <h3>Floors</h3>
            <Floors buildingID={building.uid} />
          </span>
        ) : (
          <span>
            {/* {building.ownerID} */}
            <strong>{building.title}</strong>
            {building.address}
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
