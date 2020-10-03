import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import CompanyList from './CompanyList';

import AddressForm from '../AddressForm';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

class Companies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      Companies: [],
      limit: 5,

      companyTitle: '',
      companyAddress: '',
      buildings: {
        '-MINlfvKbXva1iMa4U_i': {
          buildingTitle: 'Head Quaters',
          buildingAddress: 0,
        },
      },
    };
  }

  componentDidMount() {
    this.onListenForCompanies();
  }

  onListenForCompanies = () => {
    this.setState({ loading: true });

    this.props.firebase
      .companies()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', (snapshot) => {
        const companyObject = snapshot.val();

        if (companyObject) {
          const companyList = Object.keys(companyObject).map(
            (key) => ({
              ...companyObject[key],
              uid: key,
            }),
          );

          this.setState({
            companies: companyList,
            loading: false,
          });
        } else {
          this.setState({ companies: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.companies().off();
  }

  onChangeCompanyTitle = (event) => {
    this.setState({ companyTitle: event.target.value });
  };

  onChangeCompanyAddress = (childData) => {
    this.setState({ companyAddress: childData });
  };

  onCreateCompany = (event, authUser) => {
    this.props.firebase.companies().push({
      companyTitle: this.state.companyTitle,
      companyAddress: this.state.companyAddress,
      buildings: this.state.buildings,
      ownerID: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({
      companyTitle: '',
      companyAddress: '',
    });

    event.preventDefault();
  };

  onEditCompany = (company, companyTitle, companyAddress) => {
    const { uid, ...companySnapshot } = company;

    this.props.firebase.company(company.uid).set({
      ...companySnapshot,
      companyTitle,
      companyAddress,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveCompany = (uid) => {
    this.props.firebase.company(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForCompanies,
    );
  };

  render() {
    const {
      companyTitle,
      companyAddress,
      companies,
      loading,
    } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {!loading && companies && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {companies && (
              <CompanyList
                authUser={authUser}
                companies={companies}
                onEditCompany={this.onEditCompany}
                onRemoveCompany={this.onRemoveCompany}
              />
            )}

            {!companies && <div>There are no companies ...</div>}

            <form
              onSubmit={(event) =>
                this.onCreateCompany(event, authUser)
              }
            >
              <input
                type="text"
                placeholder="Name Your Company!"
                value={companyTitle}
                onChange={this.onChangeCompanyTitle}
              />
              {/* <input
                type="text"
                placeholder="Where does it live?"
                value={companyAddress}
                onChange={this.onChangeCompanyAddress}
              /> */}
              <AddressForm parentCallBack = {this.onChangeCompanyAddress}/>
              {/* <GooglePlacesAutocomplete
                apiKey="AIzaSyDJ1foA09dKFjq-_KfWg2K822qClFUDaAc"
                onLoadFailed={(error) =>
                  console.error(
                    'Could not inject Google script',
                    error,
                  )
                }
                selectProps={{
                  companyAddress,
                  onChange: this.onChangeCompanyAddress,
                  placeholder: 'Enter A Location...',
                }}
              /> */}

              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Companies);
