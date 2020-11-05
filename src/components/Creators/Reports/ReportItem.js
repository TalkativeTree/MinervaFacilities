import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

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

  onChangeEditTitle = (event) => {
    this.setState({ editTitle: event.target.value });
  };

  onChangeEditMessage = (event) => {
    this.setState({ editMessage: event.target.value });
  };

  onChangeEditStatus = (event) => {
    this.setState({ editStatus: event.target.value });
  };

  onChangeEditServiceType = (event) => {
    this.setState({ editServiceType: event.target.value });
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
    const {
      editMode,
      editTitle,
      editMessage,
      editStatus,
      editServiceType,
    } = this.state;

    return (
      <li className="row">
        {editMode ? (
          <div className="text-center edit-container">
            <div className="form-row">
              <input
                className="form-input"
                type="text"
                placeholder="Report Title"
                value={editTitle}
                onChange={this.onChangeEditTitle}
              />
            </div>
            <div className="form-row">
              <div className="col-5">
                <select
                  className="form-control"
                  value={editServiceType}
                  onChange={this.onChangeEditServiceType}
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
              </div>
              <div className="col-4">
                <select
                  className="form-control"
                  value={editStatus}
                  onChange={this.onChangeEditStatus}
                >
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
              value={editMessage}
              onChange={this.onChangeEditMessage}
            />
          </div>
        ) : (
          <Link
            to={{
              pathname: `${ROUTES.REPORTS}/${report.uid}`,
              state: { report },
            }}
          >
            <div className="col-10">
              <p className="comp-item">
                <strong>Subject: </strong>
                {report.title}
              </p>
              <p className="comp-item">
                <strong>Ticket Id:</strong>{' '}
                <span className="ticket-info">{report.uid}</span>
              </p>
              <p className="comp-item">
                <strong>Request Status: </strong>({report.status})
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
                <strong>Room ID:</strong>{' '}
                <span className="ticket-info">{report.roomID}</span>
              </p>
              <p className="comp-item">
                <sub>{report.editedAt && <span> (Edited)</span>}</sub>
              </p>
            </div>
          </Link>
        )}
        {authUser.uid === report.reporter && (
          <div>
            {editMode ? (
              <div className="form-row edit-btn-container">
                <button
                  className="btn btn-primary"
                  onClick={this.onSaveEditText}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={this.onToggleEditMode}
                >
                  Reset
                </button>
              </div>
            ) : (
              <button
                className="btn-li"
                onClick={this.onToggleEditMode}
              >
                {' '}
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}

            {!editMode && (
              <button
                className="btn-li"
                type="button"
                onClick={() => onRemoveReport(report.uid)}
              >
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
