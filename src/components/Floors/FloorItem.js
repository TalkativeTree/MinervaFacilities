import React, { Component } from "react";

class FloorItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editTitle: this.props.floor.title,
      editAddress: this.props.floor.address,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editTitle: this.props.floor.title,
      editAddress: this.props.floor.address,
    }));
  };

  onChangeEditTitle = (event) => {
    this.setState({ editTitle: event.target.value });
  };

  onChangeEditAddress = (event) => {
    this.setState({ editAddress: event.target.value });
  };

  onSaveEditFloor = () => {
    this.props.onEditFloor(
      this.props.floor,
      this.state.editTitle,
      this.state.editAddress
    );

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, floor, onRemoveFloor } = this.props;
    const { editMode, editTitle, editAddress } = this.state;

    return (
      <li>
        {editMode ? (
          <span>
            <input
              type="text"
              placeholder="Floor Name?"
              value={editTitle}
              onChange={this.onChangeEditTitle}
            />
            <input
              className="ml10"
              placeholder="Floor Location/Number?"
              type="address"
              value={editAddress}
              onChange={this.onChangeEditAddress}
            />
          </span>
        ) : (
          <span>
            {/* <strong>{floor.userId}</strong> */}
            {floor.title}
            {floor.address}
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
