import React, { Component } from 'react';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import ReportList from './ReportList';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyID: '',
      buildingID: '',
      floorID: '',
      roomID: '',
      title: '',
      message: '',
      status: 'OPEN',
      serviceType: '',
      loading: false,
      reports: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForReports();
  }

  onListenForReports = () => {
    this.setState({ loading: true });

    this.props.firebase
      .reports()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', (snapshot) => {
        const reportObject = snapshot.val();

        if (reportObject) {
          const reportList = Object.keys(reportObject).map((key) => ({
            ...reportObject[key],
            uid: key,
          }));

          this.setState({
            reports: reportList,
            loading: false,
          });
        } else {
          this.setState({ reports: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.reports().off();
  }

  onChangeCompanyID = (event) => {
    this.setState({ companyID: event.target.value });
  };

  onChangeBuildingID = (event) => {
    this.setState({ buildingID: event.target.value });
  };

  onChangeFloorID = (event) => {
    this.setState({ floorID: event.target.value });
  };

  onChangeRoomID = (event) => {
    this.setState({ roomID: event.target.value });
  };
  
  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  onChangeServiceType = (event) => {
    this.setState({ serviceType: event.target.value });
  };

  onCreateReport = (event, authUser) => {
    this.props.firebase.reports().push({
      companyID: this.state.companyID,
      buildingID: this.state.buildingID,
      floorID: this.state.floorID,
      roomID: this.state.roomID,
      title: this.state.title,
      message: this.state.message,
      serviceType: this.state.serviceType,
      status: this.state.status,
      reporter: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({
      companyID: '',
      buildingID: '',
      floorID: '',
      roomID: '',
      title: '',
      message: '',
      status: 'OPEN',
      serviceType: '',
    });

    event.preventDefault();
  };

  onEditReport = (report, message, serviceType) => {
    const { uid, ...reportSnapshot } = report;

    this.props.firebase.report(report.uid).set({
      ...reportSnapshot,
      companyID,
      buildingID,
      floorID,
      roomID,
      title,
      message,
      status,
      serviceType,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveReport = (uid) => {
    this.props.firebase.report(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForReports,
    );
  };

  render() {
    const {
      companyID,
      buildingID,
      floorID,
      roomID,
      reports,
      title,
      message,
      serviceType,
      loading,
    } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="add-padding-bottom text-center">
            {reports && (
              <ReportList
                authUser={authUser}
                reports={reports}
                onEditReport={this.onEditReport}
                onRemoveReport={this.onRemoveReport}
              />
            )}

            {!loading && reports && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={this.onNextPage}
              >
                Load More
              </button>
            )}

            {loading && <div>Loading...</div>}

            {!reports && <div>There are no reports...</div>}

            <h4 className="text-center">Create new report</h4>

            <div className="container text-center">
              <form
                onSubmit={(event) =>
                  this.onCreateReport(event, authUser)
                }
              >
                <div className="form-row">
                  <input
                    className="form-input col-5"
                    type="text"
                    placeholder="Company ID"
                    value={companyID}
                    onChange={this.onChangeCompanyID}
                  />
                  <input
                    className="form-input col-5"
                    type="text"
                    placeholder="Building ID"
                    value={buildingID}
                    onChange={this.onChangeBuildingID}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="form-input col-5"
                    type="text"
                    placeholder="Floor ID"
                    value={floorID}
                    onChange={this.onChangeFloorID}
                  />
                  <input
                    className="form-input col-5"
                    type="text"
                    placeholder="Room ID"
                    value={roomID}
                    onChange={this.onChangeRoomID}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Report Title"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                </div>

                <textarea
                  rows="3"
                  className="form-input col-12"
                  type="text"
                  placeholder="Reason For Report"
                  value={message}
                  onChange={this.onChangeMessage}
                />

                <select
                  className="form-control"
                  // defaultValue={'DEFAULT'}
                  value={serviceType}
                  onChange={this.onChangeServiceType}
                >
                  <option value="" disabled>
                    Select a Service
                  </option>
                  <option value="MAINTENANCE">
                    Maintenance / Repair
                  </option>
                  <option value="HAZARD">Hazard Report</option>
                  <option value="SERVICE">Service Report</option>
                </select>

                <button className="btn btn-primary" type="submit">
                  Report
                </button>
              </form>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Reports);


// TEST IDS
// -MIl88ANUFKxLp_sKsvf
// -MIqkLiTo2qwbo3JkrHL
// -MIqkPSUQ7HeoFxXdrW7
// -MIqCSAwq5QBti12uqKI
