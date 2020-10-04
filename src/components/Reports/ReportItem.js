import React, { Component } from 'react';

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
          </div>
        ) : (
          <div>
            <strong>{report.uid}</strong>({report.serviceType}){' '}
            {report.text}
            {report.editedAt && <span>(Edited)</span>}
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
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveReport(report.uid)}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </li>
    );
  }
}

export default ReportItem;
