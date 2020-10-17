import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';


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

    return (
      <div>
        <h4>Building ({building.id})</h4>
        {loading && <div>Loading ...</div>}

        {building && (
          <div>
            <strong>Title:</strong> {building.buildingTitle}
            <br />
            <strong>Location:</strong> {building.buildingAddress}
            <br />
            <strong>Company:</strong> {building.companyID}
            <br />
            <strong>Company Owner:</strong> {building.companyOwner}
            <br />
            <strong>Created At:</strong> {building.createdAt}
            <br />
            <strong>Last Edited At:</strong> {building.editedAt}
            <br />
            <strong>Floor List:</strong> {building.floorList}
          </div>
        )}

        <div className="row">
          <div className="ml-3 mr-2">
            <Link to={ROUTES.BUILDINGS}>Back</Link>
          </div>
          <div className="mr-2">
            <Link to={ROUTES.FLOORS}>Floors List</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(BuildingDetail);
