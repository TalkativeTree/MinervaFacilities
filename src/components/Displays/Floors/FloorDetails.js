import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import { AuthUserContext } from '../../Session';
import * as ROUTES from '../../../routes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


class FloorDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      floor: null,
      editMode: false,
      companyID: '',
      floorTitle: '',
      floorAddress: '',
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.floor) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase.floor(this.props.match.params.id).on('value', (snapshot) => {
      this.setState({
        floor: snapshot.val(),
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.floor(this.props.match.params.id).off();
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      companyID: this.state.companyID,
      buildingID: this.state.buildingID,
      floorTitle: this.state.floor.floorTitle,
      floorAddress: this.state.floor.floorAddress,
    }));
  };

  onSaveEdit = () => {
    const { floor, floorTitle, floorAddress } = this.state;
    const { uid, ...floorSnapshot } = floor;

    this.props.firebase.floor(floor.uid).set({
      ...floorSnapshot,
      floorTitle,
      floorAddress,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ editMode: false });
  };

  onRemoveFloor = (uid) => {
    this.props.firebase.floor(uid).remove();
  };

  render() {
    const { loading, floor, editMode, floorTitle, floorAddress } = this.state;

    const fullDateCreated = new Date(floor.createdAt * 1000).toString().split(' ');
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

    const fullDateEdited = new Date(floor.editedAt * 1000).toString().split(' ');
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

            {floor && (
              <div>
                <h5>Floor ({floor.uid})</h5>
                <strong>Title:</strong> {floor.floorTitle}
                <br />
                <strong>Location:</strong> {floor.floorAddress}
                <br />
                <strong>Company:</strong> {floor.companyID}
                <br />
                <strong>Building:</strong> {floor.buildingID}
                <br />
                <strong>Company Owner:</strong> {floor.owner.ownerName}
                <br />
                <strong>Created At:</strong> {dateCreated}
                <br />
                {floor.editedAt && (
                  <p>
                    <strong>Last Edited At:</strong> {dateEdited}
                  </p>
                )}
              </div>
            )}

            {authUser.uid === floor.owner.ownerID && (
              <div className="">
                {editMode ? (
                  <div>
                    <div>
                      <input
                        type="text"
                        className="col-10 form-input"
                        placeholder="Floor Name?"
                        name="floorTitle"
                        value={floorTitle}
                        onChange={this.onChange}
                      />
                      <input
                        placeholder="Floor Location/Number?"
                        type="text"
                        className="col-10 form-input"
                        name="floorAddress"
                        value={floorAddress}
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

                    <button type="button" className="btn-li" onClick={() => this.onRemoveFloor(floor.uid)}>
                      <Link to={ROUTES.FLOORS}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Link>
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="row">
              <div className="ml-3 mr-2">
                <Link to={ROUTES.FLOORS}>
                  <button className="btn btn-secondary">Back</button>
                </Link>
              </div>
              <div className="mr-2">
                <Link to={{ pathname: `${ROUTES.ROOMS}`, state: floor }}>
                  <button className="btn btn-success">Rooms List </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(FloorDetail);
