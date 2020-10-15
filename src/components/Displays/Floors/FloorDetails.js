import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

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
    console.log(this.props.match.params);
    this.props.firebase
      .floor(this.props.match.params.floor_name)
      .on('value', (snapshot) => {
        this.setState({
          floor: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.floor(this.props.match.params.floor_name).off();
  }

  render() {
    const { floor, loading } = this.state;

    return (
      <div>
        <h4>Floor ({floor.floorName})</h4>
        {loading && <div>Loading ...</div>}

        {floor && (
          <div>
            <span>
              <strong>Title:</strong> {floor.floorName}
            </span>
            <br />
            <span>
              <strong>Location:</strong> {floor.floorLocation}
            </span>
            <br />
            <span>
              <strong>Company:</strong> {floor.companyID}
            </span>
            <br />
            <span>
              <strong>Building:</strong> {floor.buildingID}
            </span>
            <br />
            <span>
              <strong>Company Owner:</strong> {floor.companyOwner}
            </span>
            <br />
            <span>
              <strong>Created At:</strong> {floor.createdAt}
            </span>
            <br />
            <span>
              <strong>Last Edited At:</strong> {floor.editedAt}
            </span>
            <br />
            <span>
              <strong>Room List:</strong> {floor.roomList}
            </span>
          </div>
        )}

        <span>
          <Link to={{ pathname: `${ROUTES.HOME}` }}>Back</Link>
        </span>

      </div>
    );
  }
}

export default withFirebase(FloorDetail);
