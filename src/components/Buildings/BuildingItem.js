import React, { Component } from 'react';
import Floors from '../Floors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
    const {
      companyID,
      editMode,
      editBuildingTitle,
      editBuildingAddress,
    } = this.state;

    return (
      <li className="row">
        {' '}
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
            <Floors companyID={companyID} buildingID={building.uid} />
          </span>
        ) : (
          <div className="col-10">
            {/* {building.ownerID} */}
            <p className="comp-item">
              <strong>{building.buildingTitle}</strong>
            </p>
            <p className="comp-item">{building.buildingAddress}</p>
            <p className="comp-item">
              {building.editedAt && <span>(Edited)</span>}
            </p>
          </div>
        )}
        {authUser.uid === building.ownerID && (
          <div className="col-2">
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button
                className="btn-li"
                onClick={this.onToggleEditMode}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}

            {!editMode && (
              <button
                className="btn-li"
                type="button"
                onClick={() => onRemoveBuilding(building.uid)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        )}
      </li>
    );
  }
}

export default BuildingItem;
