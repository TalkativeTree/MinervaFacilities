import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class FloorItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editFloorTitle: this.props.floor.floorTitle,
      editFloorAddress: this.props.floor.floorAddress,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editFloorTitle: this.props.floor.floorTitle,
      editFloorAddress: this.props.floor.floorAddress,
    }));
  };

  onChangeEditFloorTitle = (event) => {
    this.setState({ editFloorTitle: event.target.value });
  };

  onChangeEditFloorAddress = (event) => {
    this.setState({ editFloorAddress: event.target.value });
  };

  onSaveEditFloor = () => {
    this.props.onEditFloor(
      this.props.floor,
      this.state.editFloorTitle,
      this.state.editFloorAddress,
    );

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, floor, onRemoveFloor } = this.props;
    const { editMode, editFloorTitle, editFloorAddress } = this.state;

    return (
      <li className="row">
        {' '}
        {editMode ? (
          <div>
            <input
              type="text"
              className="col-10 form-input"
              placeholder="Floor Name?"
              value={editFloorTitle}
              onChange={this.onChangeEditFloorTitle}
            />
            <input
              placeholder="Floor Location/Number?"
              type="text"
              className="col-10 form-input"
              value={editFloorAddress}
              onChange={this.onChangeEditFloorAddress}
            />
          </div>
        ) : (
          <div className="col-8">
            {/* <strong>{floor.userId}</strong> */}
            {floor.floorTitle}
            {floor.floorAddress}
            {floor.editedAt && <span>(Edited)</span>}
          </div>
        )}
        {authUser.uid === floor.userId && (
          <div>
            {editMode ? (
              <div className="justify-me col-2">
                <button
                  className="btn btn-secondary btn-bot"
                  onClick={this.onSaveEditFloor}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary btn-bot"
                  onClick={this.onToggleEditMode}
                >
                  Reset
                </button>
              </div>
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
                type="button"
                className="btn-li"
                onClick={() => onRemoveFloor(floor.uid)}
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

export default FloorItem;
