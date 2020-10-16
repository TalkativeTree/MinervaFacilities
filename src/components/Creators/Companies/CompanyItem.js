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
          <div className="">
            {editMode ? (
              <div className="justify-me">
                <button
                  className="btn btn-secondary btn-bot"
                  onClick={this.onSaveEditText}
                >
                  Save Changes
                </button>
                <button
                  className="btn btn-secondary btn-bot"
                  onClick={this.onToggleEditMode}
                >
                  Cancel Edit
                </button>
              </div>
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
          </div>
        )}
      </li>
    );
  }
}

export default CompanyItem;
