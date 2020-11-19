import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../routes';


class BuildingDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      building: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.building) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .building(this.props.match.params.id)
      .on('value', (snapshot) => {
        this.setState({
          building: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.building(this.props.match.params.id).off();
  }

  render() {
    const { building, loading } = this.state;

    const fullDateCreated = new Date(building.createdAt * 1000).toString().split(' ');
    const dateCreated =
      fullDateCreated[0] + ', ' + fullDateCreated[1] + ' ' + fullDateCreated[2] + ', ' + 
      fullDateCreated[4] + ', ' + fullDateCreated[6] + fullDateCreated[7] + fullDateCreated[8];

    const fullDateEdited = new Date(building.editedAt * 1000).toString().split(' ');
    const dateEdited =
      fullDateEdited[0] + ', ' + fullDateEdited[1] + ' ' + fullDateEdited[2] + ', ' +
      fullDateEdited[4] + ', ' + fullDateEdited[6] + fullDateEdited[7] + fullDateEdited[8];

    return (
      <div className="container">
        {loading && <div>Loading ...</div>}

        {building && (
          <div>
            <h5>Building ({building.id})</h5>
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
            <br />
            <strong>Floor List:</strong> {building.floorList}
          </div>
        )}

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
    );
  }
}

export default withFirebase(BuildingDetail);
