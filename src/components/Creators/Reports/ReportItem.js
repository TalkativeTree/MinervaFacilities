import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class ReportItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.report.text,
      editServiceType: this.props.report.serviceType,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editText: this.props.report.text,
      editServiceType: this.props.report.serviceType,
    }));
  };

  onChangeEditText = (event) => {
    this.setState({ editText: event.target.value });
  };

  onChangeEditServiceType = (event) => {
    this.setState({ editServiceType: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditReport(
      this.props.report,
      this.state.editText,
      this.state.editServiceType,
    );

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, report, onRemoveReport } = this.props;
    const { editMode, editText, editServiceType } = this.state;

    return (
      <li className="row">
        {' '}
        {editMode ? (
          <div>
            <input
              type="text"
              value={editText}
              onChange={this.onChangeEditText}
            />
            &nbsp;
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
            &nbsp;
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
              {report.reportMessage}
            </p>
            <p className="comp-item">
              <sub>{report.editedAt && <span> (Edited)</span>}</sub>
            </p>
          </div>
        )}
        {authUser.uid === report.userId && (
          <div>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText}>Save</button>
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
