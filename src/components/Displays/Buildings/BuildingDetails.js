import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import { AuthUserContext } from '../../Session';
import * as ROUTES from '../../../routes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


class BuildingDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      building: null,
      editMode: false,
      companyID: '',
      buildingTitle: '',
      buildingAddress: '',
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.building) {
      console.log(this.state);
      return;
    }

    this.setState({ loading: true });

    this.props.firebase.building(this.props.match.params.id).on('value', (snapshot) => {
      this.setState({
        building: snapshot.val(),
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.building(this.props.match.params.id).off();
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      companyID: this.state.companyID,
      buildingTitle: this.state.building.buildingTitle,
      buildingAddress: this.state.building.buildingAddress,
    }));
  };

  onSaveEdit = () => {
    const { building, buildingTitle, buildingAddress } = this.state;
    const { uid, ...buildingSnapshot } = building;

    this.props.firebase.building(building.uid).set({
      ...buildingSnapshot,
      buildingTitle,
      buildingAddress,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ editMode: false });
  };

  onRemoveBuilding = (uid) => {
    this.props.firebase.building(uid).remove();
  };

  render() {
    const { loading, building, companyID, editMode, buildingTitle, buildingAddress } = this.state;

    const fullDateCreated = new Date(building.createdAt * 1000).toString().split(' ');
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

    const fullDateEdited = new Date(building.editedAt * 1000).toString().split(' ');
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

            {/* Display */}
            {building && (
              <div>
                <h5>Building ({building.uid})</h5>
                <strong>Title:</strong> {building.buildingTitle}
                <br />
                <strong>Location:</strong> {building.buildingAddress}
                <br />
                <strong>Company:</strong> {building.companyID}
                <br />
                <strong>Company Owner:</strong> {building.companyOwner}
                <br />
                <strong>Created At:</strong> {dateCreated}
                <br />
                {building.editedAt && (
                  <p>
                    <strong>Last Edited At:</strong> {dateEdited}
                  </p>
                )}
              </div>
            )}

            {authUser.uid === building.owner.ownerID && (
              <div className="">
                {editMode ? (
                  <div>
                    <div className="container">
                      <input
                        type="text"
                        className="col-10 form-input"
                        placeholder="Name Your Building!"
                        name="buildingTitle"
                        value={buildingTitle}
                        onChange={this.onChange}
                      />
                      <input
                        type="text"
                        className="col-10 form-input"
                        placeholder="Where does it live?"
                        name="buildingAddress"
                        value={buildingAddress}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className="justify-me">
                      <button className="btn btn-secondary btn-bot" onClick={this.onSaveEdit}>
                        Save Changes
                      </button>
                      <button className="btn btn-secondary btn-bot" onClick={this.onToggleEditMode}>
                        Cancel Edit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <button className="btn-li" onClick={this.onToggleEditMode}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>

                    <button className="btn-li" tpye="button" onClick={() => this.onRemoveBuilding(building.uid)}>
                      <Link to={ROUTES.BUILDINGS}><FontAwesomeIcon icon={faTrash} /></Link>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="row">
              <div className="ml-3 mr-2">
                <Link to={ROUTES.BUILDINGS}>
                  <button className="btn btn-secondary">Back</button>
                </Link>
              </div>
              <div className="mr-2">
                <Link to={{ pathname: `${ROUTES.FLOORS}`, state: building }}>
                  <button className="btn btn-success">Floors List </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(BuildingDetail);
