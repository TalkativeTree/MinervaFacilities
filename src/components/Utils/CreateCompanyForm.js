import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HOME } from '../../routes';

import { withFirebase } from '../Firebase';

// import AddressForm from '../AddressForm';

class CompanyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyTitle: '',
      companyAddress: '',
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCreateCompany = () => {
    let ownerName = this.props.authUser.username;
    let ownerID = this.props.authUser.uid;

    var companyData = {
      companyTitle: this.state.companyTitle,
      companyAddress: this.state.companyAddress,
      owner: { ownerName, ownerID },
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    };

    let companyID = this.props.firebase.createCompany(companyData);
    console.log(companyID);
    this.setState({
      companyTitle: '',
      companyAddress: '',
    });
  };

  render() {
    const { companyTitle, companyAddress } = this.state;

    return (
      <div className="add-padding-bottom text-center">
        <h1>Create A Company!</h1>
        <form>
          <input
            className="col-10 form-input"
            type="text"
            placeholder="Name Your Company!"
            value={companyTitle}
            name="companyTitle"
            onChange={this.onChange}
          />
          <input
            className="col-10 form-input"
            type="text"
            placeholder="Where does it live?"
            value={companyAddress}
            name="companyAddress"
            onChange={this.onChange}
          />

          {/* <AddressForm parentCallBack={this.onChangeCompanyAddress} /> */}
        </form>

        <button className="btn btn-primary" type="submit" onClick={this.onCreateCompany}>
          <Link to={HOME}>click me to send back</Link>
        </button>

      </div>
    );
  }
}

export default withFirebase(CompanyForm);
