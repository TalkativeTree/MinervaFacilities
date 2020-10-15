import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class ReportItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editMessage: this.props.report.message,
      editStatus: this.props.report.status,
      editServiceType: this.props.report.serviceType,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editMessage: this.props.report.message,
      editStatus: this.props.report.status,
      editServiceType: this.props.report.serviceType,
    }));
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
      this.state.editMessage,
      this.state.status,
      this.state.editServiceType,
    );

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, report, onRemoveReport } = this.props;
    const { editMode, editMessage, editStatus, editServiceType } = this.state;

    return (
      <li className="row">
        {' '}
        {editMode ? (
          <div>
            <input
              className="ml-1 mr-2"
              type="text"
              value={editMessage}
              onChange={this.onChangeEditMessage}
            />

            <select
              value={editServiceType}
              onChange={this.onChangeEditServiceType}
            >
              <option value="">Select a Service</option>
              <option value="MAINTENANCE">
                Maintenance / Repair
              </option>
              <option value="HAZARD">Hazard Report</option>
              <option value="SERVICE">Service Report</option>
            </select>

            <select
              className="ml-1 mr-2"
              value={editStatus}
              onChange={this.onChangeEditStatus}
            >
              <option value="">Select a Status</option>
              <option value="OPEN">OPEN</option>
              <option value="CLOSED">CLOSED</option>
              <option value="URGENT">URGENT</option>
            </select>
          </div>
        ) : (
          <div className="col-10">
            <p className="comp-item">
              <strong>Ticket Id:</strong> {report.uid}
            </p>
            <p className="comp-item">
              <strong>Request Status: </strong>({report.status}){' '}
            </p>
            <p className="comp-item">
              <strong>Request Type: </strong>({report.serviceType}){' '}
            </p>
            <p className="comp-item report-desc">
              <strong>Desc: </strong>
              {report.message}
            </p>
            <p className="comp-item report-location">
              <strong>Location: </strong>
              <br />
              {/* Company ID: {report.companyID},<br /> */}
              {/* Building ID: {report.buildingID},<br /> */}
              {/* Floor ID: {report.floorID},<br /> */}
              Room ID: {report.roomID}
            </p>
            <p className="comp-item">
              <sub>{report.editedAt && <span> (Edited)</span>}</sub>
            </p>
          </div>
        )}
        {authUser.uid === report.reporter && (
          <div>
            {editMode ? (
              <span>
                <button
                  className="ml-1 mr-2"
                  onClick={this.onSaveEditText}
                >
                  Save
                </button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <span>
                &nbsp;
                <button
                  className="btn-li"
                  onClick={this.onToggleEditMode}
                >
                  {' '}
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </span>
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
