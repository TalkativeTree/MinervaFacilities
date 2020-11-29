import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import { AuthUserContext } from '../../Session';
import * as ROUTES from '../../../routes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class CompanyDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      loading: false,
      company: null,
      companyTitle: '',
      companyAddress: '',
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.company) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase.company(this.props.match.params.id).on('value', (snapshot) => {
      this.setState({
        company: snapshot.val(),
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.company(this.props.match.params.id).off();
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      companyTitle: this.state.company.companyTitle,
      companyAddress: this.state.company.companyAddress,
    }));
  };

  onSaveEdit = () => {
    const { company, companyTitle, companyAddress } = this.state;
    const { uid, ...companySnapshot } = company;

    this.props.firebase.company(company.uid).set({
      ...companySnapshot,
      companyTitle,
      companyAddress,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ editMode: false });
  };

  onRemoveCompany = (uid, userID) => {
    let dbUSER = this.props.firebase.user(userID)
    dbUSER.child('companies').child(uid).remove();
    dbUSER.child('company_id').remove();
    this.props.firebase.company(uid).remove();
    console.log("REMOVED Company: ", uid, dbUSER);
  };

  render() {
    const { loading, company, editMode, companyTitle, companyAddress } = this.state;

    const fullDateCreated = new Date(company.createdAt * 1000).toString().split(' ');
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

    const fullDateEdited = new Date(company.editedAt * 1000).toString().split(' ');
    const dateEdited =
      fullDateEdited[0] +
      ', ' +
      fullDateEdited[1] +
      ' ' +
      fullDateEdited[2] +
      ', ' +
      fullDateEdited[4] +
      ', ' +
      fullDateEdited[6] +
      fullDateEdited[7] +
      fullDateEdited[8];

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="container">
            {loading && <div>Loading ...</div>}

            {/* Display */}
            {company && (
              <div>
                <h5>Company ({company.uid})</h5>
                <strong>Title:</strong> {company.companyTitle}
                <br />
                <strong>Location:</strong> {company.companyAddress}
                <br />
                <strong>Company Owner:</strong> {company.ownerID}
                <br />
                <strong>Created At:</strong> {dateCreated}
                <br />
                {company.editedAt && (
                  <p>
                    <strong>Last Edited At:</strong> {dateEdited}
                  </p>
                )}
                <br />
                {company.buildingList && (
                  <p>
                    <strong>Buildings List:</strong> {company.buildingsList}
                  </p>
                )}
              </div>
            )}

            {authUser.uid === company.owner.ownerID && (
              <div className="">
                {editMode ? (
                  <div>
                    <div className="container">
                      <input
                        type="text"
                        className="form-input form-control"
                        placeholder="Company name..."
                        name="companyTitle"
                        value={companyTitle}
                        onChange={this.onChange}
                      />
                      <input
                        type="text"
                        className="form-input form-control"
                        placeholder="Address..."
                        name="companyAddress"
                        value={companyAddress}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className="justify-me">
                      <button className="btn btn-secondary btn-bot" onClick={this.onSaveEdit}>
                        Save Changes
                      </button>
                      <button className="btn btn-secondary btn-bot" onClick={this.onToggleEditMode}>
                        Cancel Edit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <button className="btn-li" onClick={this.onToggleEditMode}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>

                    <button className="btn-li" type="button" onClick={(auhtUser) => this.onRemoveCompany(company.uid, auhtUser.uid)}>
                      <Link to={ROUTES.COMPANIES}><FontAwesomeIcon icon={faTrash} /></Link>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="row">
              <div className="ml-3 mr-2">
                <Link to={ROUTES.COMPANIES}>
                  <button className="btn btn-secondary">Back</button>
                </Link>
              </div>
              <div className="mr-2">
                <Link to={{ pathname: `${ROUTES.BUILDINGS}`, state: company }}>
                  <button className="btn btn-success">Buildings List</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(CompanyDetail);
