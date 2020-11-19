import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../routes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class ReportItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editTitle: this.props.report.title,
      editMessage: this.props.report.message,
      editStatus: this.props.report.status,
      editServiceType: this.props.report.serviceType,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editTitle: this.props.report.title,
      editMessage: this.props.report.message,
      editStatus: this.props.report.status,
      editServiceType: this.props.report.serviceType,
    }));
  };

  onChangeEdits = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditReport(
      this.props.report,
      this.state.editTitle,
      this.state.editMessage,
      this.state.status,
      this.state.editServiceType,
    );

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, report, onRemoveReport } = this.props;
    const { editMode, editTitle, editMessage, editStatus, editServiceType } = this.state;

    // const date = report.createdAt;
    const fullDate = new Date(report.createdAt * 1000).toString().split(" ");
    const date =
      fullDate[0] + ', ' + fullDate[1] + ' ' + fullDate[2] + ', ' + fullDate[4] + ', ' + fullDate[6] + fullDate[7] + fullDate[8];
    // https://stackoverflow.com/a/57103780/13986242

    return (
      <li className="row">
        {editMode ? (
          <div className="text-center edit-container">
            <div className="form-row">
              <input
                className="form-input col-10"
                type="text"
                placeholder="Report Title"
                name="editTitle"
                value={editTitle}
                onChange={this.onChangeEdits}
              />
            </div>
            <div className="form-row">
              <div className="col-5">
                <select className="form-control" name="editServiceType" value={editServiceType} onChange={this.onChangeEdits}>
                  <option value="" disabled>
                    Select a Service
                  </option>
                  <option value="MAINTENANCE">Maintenance / Repair</option>
                  <option value="HAZARD">Hazard Report</option>
                  <option value="SERVICE">Service Report</option>
                </select>
              </div>
              <div className="col-4">
                <select className="form-control" name="editStatus" value={editStatus} onChange={this.onChangeEdits}>
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
              name="editMessage"
              value={editMessage}
              onChange={this.onChangeEdits}
            />
          </div>
        ) : (
          <Link
            to={{
              pathname: `${ROUTES.REPORTS}/${report.uid}`,
              state: { report },
            }}
          >
            <div className="report-card">
              <p className="comp-item report-title">
                <strong>{report.title}</strong>
              </p>

              <hr />

              <p className="comp-item report-id">
                <sup>
                  {date} <br /> {report.uid}
                </sup>
              </p>
              <p className="comp-item">
                <strong>Status: </strong>({report.status})
              </p>
              <p className="comp-item">
                <strong>Request Type: </strong>({report.serviceType})
              </p>
              {/* <p className="comp-item report-desc">
                <strong>Desc: </strong>
                {report.message}
              </p> */}
              <p className="comp-item report-location">
                {/* <strong>Location: </strong> */}
                {/* Company ID: {report.companyID},<br /> */}
                {/* Building ID: {report.buildingID},<br /> */}
                {/* Floor ID: {report.floorID},<br /> */}
                <strong>Room ID:</strong>
                <span className="ticket-info">{report.roomID}</span>
              </p>
              {/* <p className="comp-item">
                <sub>{report.editedAt && <span> (Edited)</span>}</sub>
              </p> */}
            </div>
          </Link>
        )}
        {authUser.uid === report.reporter && (
          <div>
            {editMode ? (
              <div className="form-row edit-btn-container">
                <button className="btn btn-primary" onClick={this.onSaveEditText}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={this.onToggleEditMode}>
                  Reset
                </button>
              </div>
            ) : (
              <button className="btn-li" onClick={this.onToggleEditMode}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}

            {!editMode && (
              <button className="btn-li" type="button" onClick={() => onRemoveReport(report.uid)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        )}
      </li>
    );
  }
}

export default ReportItem;
