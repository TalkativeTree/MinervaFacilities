import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import BuildingList from './BuildingList';

class Buildings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      Buildings: [],
      limit: 5,

      title: '',
      address: '',
      floors: {
        '-MINlfvKbXva1iMa4U_i': {
          title: 'main-floor',
          address: 0,
        },
      },
    };
  }

  componentDidMount() {
    this.onListenForBuildings();
  }

  onListenForBuildings = () => {
    this.setState({ loading: true });

    this.props.firebase
      .buildings()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', (snapshot) => {
        const buildingObject = snapshot.val();

        if (buildingObject) {
          const buildingList = Object.keys(buildingObject).map(
            (key) => ({
              ...buildingObject[key],
              uid: key,
            }),
          );

          this.setState({
            buildings: buildingList,
            loading: false,
          });
        } else {
          this.setState({ buildings: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.buildings().off();
  }

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  onCreateBuilding = (event, authUser) => {
    this.props.firebase.buildings().push({
      title: this.state.title,
      address: this.state.address,
      floors: this.state.floors,
      ownerID: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({
      title: '',
      address: '',
    });

    event.preventDefault();
  };

  onEditBuilding = (building, title, address, floors) => {
    const { uid, ...buildingSnapshot } = building;

    this.props.firebase.building(building.uid).set({
      ...buildingSnapshot,
      title,
      address,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveBuilding = (uid) => {
    this.props.firebase.building(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForBuildings,
    );
  };

  render() {
    const { title, address, buildings, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {!loading && buildings && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {buildings && (
              <BuildingList
                authUser={authUser}
                buildings={buildings}
                onEditBuilding={this.onEditBuilding}
                onRemoveBuilding={this.onRemoveBuilding}
              />
            )}

            {!buildings && <div>There are no buildings ...</div>}

            <form
              onSubmit={(event) =>
                this.onCreateBuilding(event, authUser)
              }
            >
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Building Name..."
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Address..."
                    value={address}
                    onChange={this.onChangeAddress}
                  />
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-primary" type="submit">
                  Add Building
                </button>
              </div>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Buildings);
