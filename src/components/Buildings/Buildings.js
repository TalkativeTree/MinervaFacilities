import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import BuildingList from './BuildingList';

class Buildings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      companyID: this.props.companyID,
      Buildings: [],
      limit: 5,

      buildingTitle: '',
      buildingAddress: '',
      floors: {
        '-MINlfvKbXva1iMa4U_i': {
          floorTitle: 'main-floor',
          floorAddress: 0,
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
      .buildings(this.state.companyID)
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

  onChangeBuildingTitle = (event) => {
    this.setState({ buildingTitle: event.target.value });
  };

  onChangeBuildingAddress = (event) => {
    this.setState({ buildingAddress: event.target.value });
  };

  onCreateBuilding = (event, authUser) => {
    this.props.firebase.buildings(this.state.companyID).push({
      buildingTitle: this.state.buildingTitle,
      buildingAddress: this.state.buildingAddress,
      floors: this.state.floors,
      ownerID: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({
      buildingTitle: '',
      buildingAddress: '',
    });

    event.preventDefault();
  };

  onEditBuilding = (building, buildingTitle, buildingAddress) => {
    const { uid, ...buildingSnapshot } = building;

    this.props.firebase
      .building(this.state.companyID, building.uid)
      .set({
        ...buildingSnapshot,
        buildingTitle,
        buildingAddress,
        editedAt: this.props.firebase.serverValue.TIMESTAMP,
      });
  };

  onRemoveBuilding = (uid) => {
    this.props.firebase.building(this.state.companyID, uid).remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForBuildings,
    );
  };

  render() {
    const {
      companyID,
      buildingTitle,
      buildingAddress,
      buildings,
      loading,
    } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="text-center">
            {!loading && buildings && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {buildings && (
              <BuildingList
                authUser={authUser}
                companyID={companyID}
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
              <div className="">
                <div className="form-group col-10">
                  <input
                    className="form-control form-input"
                    type="text"
                    placeholder="Building Name..."
                    value={buildingTitle}
                    onChange={this.onChangeBuildingTitle}
                  />
                </div>
                <div className="form-group col-10">
                  <input
                    className="form-control form-input"
                    type="text"
                    placeholder="Address..."
                    value={buildingAddress}
                    onChange={this.onChangeBuildingAddress}
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
