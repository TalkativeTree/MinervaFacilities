import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../routes';


class FloorDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      floor: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.floor) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .floor(this.props.match.params.id)
      .on('value', (snapshot) => {
        this.setState({
          floor: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.floor(this.props.match.params.id).off();
  }

  render() {
    const { floor, loading } = this.state;

    const fullDateCreated = new Date(floor.createdAt * 1000).toString().split(' ');
    const dateCreated =
      fullDateCreated[0] + ', ' + fullDateCreated[1] + ' ' + fullDateCreated[2] + ', ' +
      fullDateCreated[4] + ', ' + fullDateCreated[6] + fullDateCreated[7] + fullDateCreated[8];

    const fullDateEdited = new Date(floor.editedAt * 1000).toString().split(' ');
    const dateEdited =
      fullDateEdited[0] + ', ' + fullDateEdited[1] + ' ' + fullDateEdited[2] + ', ' +
      fullDateEdited[4] + ', ' + fullDateEdited[6] + fullDateEdited[7] + fullDateEdited[8];


    return (
      <div className="container">
        {loading && <div>Loading ...</div>}

        {floor && (
          <div>
            <h5>Floor ({floor.id})</h5>
            <strong>Title:</strong> {floor.floorName}
            <br />
            <strong>Location:</strong> {floor.floorLocation}
            <br />
            <strong>Company:</strong> {floor.companyID}
            <br />
            <strong>Building:</strong> {floor.buildingID}
            <br />
            <strong>Company Owner:</strong> {floor.companyOwner}
            <br />
            <strong>Created At:</strong> {dateCreated}
            <br />
            {floor.editedAt && (
              <p>
                <strong>Last Edited At:</strong> {dateEdited}
              </p>
            )}
            <br />
            <strong>Room List:</strong> {floor.roomList}
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
    );
  }
}

export default withFirebase(FloorDetail);
