import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';


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

    return (
      <div>
        <h4>Floor ({floor.id})</h4>
        {loading && <div>Loading ...</div>}

        {floor && (
          <div>
            <strong>Title:</strong> {floor.floorName}<br />
            <strong>Location:</strong> {floor.floorLocation}<br />
            <strong>Company:</strong> {floor.companyID}<br />
            <strong>Building:</strong> {floor.buildingID}<br />
            <strong>Company Owner:</strong> {floor.companyOwner}<br />
            <strong>Created At:</strong> {floor.createdAt}<br />
            <strong>Last Edited At:</strong> {floor.editedAt}<br />
            <strong>Room List:</strong> {floor.roomList}
          </div>
        )}

        <div className="row">
          <div className="ml-3 mr-2">
            <Link to={ROUTES.FLOORS}>Back</Link>
          </div>
          <div className="mr-2">
            <Link to={ROUTES.ROOMS}>Rooms List</Link>
          </div>
        </div>

      </div>
    );
  }
}

export default withFirebase(FloorDetail);
