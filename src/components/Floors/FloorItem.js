import React, { Component } from 'react';

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
      <li>
        {editMode ? (
          <span>
            <input
              type="text"
              placeholder="Floor Name?"
              value={editFloorTitle}
              onChange={this.onChangeEditFloorTitle}
            />
            <input
              placeholder="Floor Location/Number?"
              type="text"
              value={editFloorAddress}
              onChange={this.onChangeEditFloorAddress}
            />
          </span>
        ) : (
          <span>
            {/* <strong>{floor.userId}</strong> */}
            {floor.floorTitle}
            {floor.floorAddress}
            {floor.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {authUser.uid === floor.userId && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditFloor}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveFloor(floor.uid)}
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

export default FloorItem;
