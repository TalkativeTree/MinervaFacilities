import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import ReportList from './ReportList';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBlocking: false,

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
            isBlocking: false,
          });
        } else {
          this.setState({ reports: null, loading: false, isBlocking: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.reports().off();
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      isBlocking: event.target.value.length > 0,
    });
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
      isBlocking: false,
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
      isBlocking,

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
              <button className="btn btn-secondary" type="button" onClick={this.onNextPage}>
                Load More
              </button>
            )}

            {loading && <div>Loading...</div>}

            {!reports && <div>There are no reports...</div>}

            <h4 className="text-center">Create new report</h4>

            <div className="container text-center">
              <form onSubmit={(event) => this.onCreateReport(event, authUser)}>
                <Prompt when={isBlocking} message={(location) => `Are you sure you want to go to ${location.pathname}`} />
                <p>Blocking? {isBlocking ? 'Yes, click a link or the back button' : 'Nope'}</p>


                <div className="form-row">
                  <input
                    className="form-input col-5"
                    type="text"
                    placeholder="Company ID"
                    name="companyID"
                    value={companyID}
                    onChange={this.onChange}
                  />
                  <input
                    className="form-input col-5"
                    type="text"
                    placeholder="Building ID"
                    name="buildingID"
                    value={buildingID}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="form-input col-5"
                    type="text"
                    placeholder="Floor ID"
                    name="floorID"
                    value={floorID}
                    onChange={this.onChange}
                  />
                  <input
                    className="form-input col-5"
                    type="text"
                    placeholder="Room ID"
                    name="roomID"
                    value={roomID}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="form-input col-10"
                    type="text"
                    placeholder="Report Title"
                    name="title"
                    value={title}
                    onChange={this.onChange}
                  />
                </div>

                <textarea
                  rows="3"
                  className="form-input col-12"
                  type="text"
                  placeholder="Reason For Report"
                  nmae="message"
                  value={message}
                  onChange={this.onChange}
                />

                <select className="form-control" name="serviceType" value={serviceType} onChange={this.onChangeServiceType}>
                  <option value="" disabled>
                    Select a Service
                  </option>
                  <option value="MAINTENANCE">Maintenance / Repair</option>
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
