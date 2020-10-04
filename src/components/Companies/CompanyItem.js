import React, { Component } from 'react';
import Buildings from '../Buildings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class CompanyItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editCompanyTitle: this.props.company.companyTitle,
      editCompanyAddress: this.props.company.companyAddress,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editCompanyTitle: this.props.company.companyTitle,
      editCompanyAddress: this.props.company.companyAddress,
    }));
  };

  onChangeEditCompanyTitle = (event) => {
    this.setState({ editCompanyTitle: event.target.value });
  };

  onChangeEditCompanyAddress = (event) => {
    this.setState({ editCompanyAddress: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditCompany(
      this.props.company,
      this.state.editCompanyTitle,
      this.state.editCompanyAddress,
    );

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, company, onRemoveCompany } = this.props;
    const {
      editMode,
      editCompanyTitle,
      editCompanyAddress,
    } = this.state;

    return (
      <li className="row">
        {editMode ? (
          <div className="container">
            <input
              type="text"
              className="form-input form-control"
              placeholder="Company name..."
              value={editCompanyTitle}
              onChange={this.onChangeEditCompanyTitle}
            />
            <input
              type="text"
              className="form-input form-control"
              placeholder="Address..."
              value={editCompanyAddress}
              onChange={this.onChangeEditCompanyAddress}
            />

            <h4 className="text-center">Buildings/Facilities</h4>
            <Buildings companyID={company.uid} />
          </div>
        ) : (
          <div className="col-10">
            {/* {company.ownerID} */}
            <p className="comp-item">
              <strong>{company.companyTitle}</strong>
            </p>
            <p className="comp-item">{company.companyAddress}</p>
            <sub className="comp-item">
              {company.editedAt && <span>(Edited)</span>}
            </sub>
          </div>
        )}

        {authUser.uid === company.ownerID && (
          <span className="col-2">
            {editMode ? (
              <span>
                <button
                  className="btn btn-secondary"
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
              </span>
            ) : (
              <button
                className="btn-li"
                onClick={this.onToggleEditMode}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}

            {!editMode && (
              <button
                className="btn-li"
                type="button"
                onClick={() => onRemoveCompany(company.uid)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default CompanyItem;
