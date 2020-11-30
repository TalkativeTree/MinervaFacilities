import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// https://www.npmjs.com/package/react-confirm-alert

import * as ROUTES from '../../../routes';
import { withFirebase } from '../../Firebase';
import { AuthUserContext } from '../../Session';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


class ReportDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      editMode: false,
      isBlocking: false,
      upload: null,
      progress: 0,

      report: null,
      // reportData: {
      //   companyID: '',
      //   buildingID: '',
      //   floorID: '',
      //   roomID: '',

      reportTitle: '',
      reportMessage: '',
      reportStatus: 'OPEN',
      reportServiceType: '',

      //   reportImageURL: '',
      //   reportImageName: '',
      // },
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.report) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase.reports(this.props.match.params.id).on('value', (snapshot) => {
      this.setState({
        report: snapshot.val(),
        loading: false,
        isBlocking: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.report(this.props.match.params.id).off();
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      reportTitle: this.state.report.reportTitle,
      reportMessage: this.state.report.reportMessage,
      reportStatus: this.state.report.reportStatus,
      reportServiceType: this.state.report.reportServiceType,
    }));
  };

  onChangeEdits = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      isBlocking: event.target.value.length > 0,
    });
  };

  onSaveEdit = () => {
    const { report, reportTitle, reportMessage, reportStatus, reportServiceType } = this.state;

    const { uid, ...reportSnapshot } = report;

    this.props.firebase.report(report.uid).set({
      ...reportSnapshot,
      reportTitle,
      reportMessage,
      reportStatus,
      reportServiceType,
      // image_url,
      // image_name,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ editMode: false });
  };

  onRemoveReport = (uid) => {
    const report = this.props.firebase.report(uid);

    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // this.props.firebase.storage.ref().child('images').delete(), 
            report.remove();
          },
          // alert('Click Yes'),
        },
        {
          label: 'No',
          // onClick: () => alert('Click No'),
        },
      ],
    });
  };

  render() {
    const { loading, report, editMode, reportTitle, reportMessage, reportStatus, reportServiceType } = this.state;

    const fullDateCreated = new Date(report.createdAt * 1000).toString().split(' ');
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

    const FullDateEdited = new Date(report.editedAt * 1000).toString().split(' ');
    const dateEdited =
      FullDateEdited[0] +
      ', ' +
      FullDateEdited[1] +
      ' ' +
      FullDateEdited[2] +
      ', ' +
      FullDateEdited[4] +
      ', ' +
      FullDateEdited[6] +
      FullDateEdited[7] +
      FullDateEdited[8];

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="content-wrapper">
            {loading && <div>Loading ...</div>}

            {report && (
              <div className="container">
                <div className="r-details-card">
                  <strong>Company:</strong> {report.location.companyID}
                  <br />
                  <strong>Building:</strong> {report.location.buildingID}
                  <br />
                  <strong>Reporter:</strong> {report.reporter.ownerName}
                  <br />
                  <strong>Created At:</strong> {dateCreated}
                  <br />
                  {report.editedAt && (
                    <p>
                      <strong>Last Edited At:</strong> {dateEdited}
                    </p>
                  )}
                </div>
                <br />

                <div className="r-details-card">
                  <p className="comp-item">
                    <strong>Subject: </strong>
                    {report.reportTitle}
                  </p>
                  <p className="comp-item">
                    <strong>Ticket Id:</strong> <span className="ticket-info">{report.uid}</span>
                  </p>
                  <p className="comp-item">
                    <strong>Request Status: </strong>({report.reportStatus})
                  </p>
                  <p className="comp-item">
                    <strong>Request Type: </strong>({report.reportServiceType})
                  </p>
                  <p className="comp-item report-desc">
                    <strong>Desc: </strong>
                    {report.reportMessage}
                  </p>
                  {report.image && (
                    <div>
                      <a href={report.image}>
                        <img src={report.image} alt="Uploaded Images" height="150" width="150" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {authUser.uid === report.reporter.ownerID && (
              <div>
                {editMode ? (
                  <div className="text-center edit-container">
                    <div className="form-row">
                      <input
                        className="form-input col-10"
                        type="text"
                        placeholder="Report Title"
                        name="reportTitle"
                        value={reportTitle}
                        onChange={this.onChangeEdits}
                      />
                    </div>
                    <div className="form-row">
                      <div className="col-5">
                        <select
                          className="form-control"
                          name="reportServiceType"
                          value={reportServiceType}
                          onChange={this.onChangeEdits}
                        >
                          <option value="" disabled>
                            Select a Service
                          </option>
                          <option value="MAINTENANCE">Maintenance / Repair</option>
                          <option value="HAZARD">Hazard Report</option>
                          <option value="SERVICE">Service Report</option>
                        </select>
                      </div>
                      <div className="col-4">
                        <select className="form-control" name="reportStatus" value={reportStatus} onChange={this.onChangeEdits}>
                          <option value="" disabled>
                            Select a Status
                          </option>
                          <option value="OPEN">OPEN</option>
                          <option value="CLOSED">CLOSED</option>
                          <option value="URGENT">URGENT</option>
                        </select>
                      </div>
                    </div>
                    <textarea
                      rows="1"
                      className="form-input col-10"
                      type="text"
                      name="reportMessage"
                      value={reportMessage}
                      onChange={this.onChangeEdits}
                    />

                    <div className="form-row edit-btn-container">
                      <button className="btn btn-primary" onClick={this.onSaveEdit}>
                        Save
                      </button>
                      <button className="btn btn-secondary" onClick={this.onToggleEditMode}>
                        Reset
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="row justify-me">
                    <button className="btn-li" onClick={this.onToggleEditMode}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>

                    <button className="btn-li" type="button" onClick={() => this.onRemoveReport(report.uid)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="container text-center mt-3">
              <Link to={ROUTES.REPORTS}>
                <button className="btn btn-secondary">Back </button>
              </Link>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(ReportDetail);
