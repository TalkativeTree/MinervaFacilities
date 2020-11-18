import React from 'react';
import { compose } from 'recompose';
import { Tabs, Tab } from 'react-bootstrap';

import { AuthUserContext, withEmailVerification, withAuthorization } from '../Session';


const HomePage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (authUser.roles === 'OWNER' || authUser.roles === 'MANAGER' ? <AdminHomePage /> : <EmployeeHomePage />)}
  </AuthUserContext.Consumer>
);

const EmployeeHomePage = () => (
  <div>
    <div className="jumbotron paral paralsec">
      <h1 className="display-8 text-center">Home</h1>
    </div>
    <h6 className="text-center">Recent Reports:</h6>
    {/* <Reports /> */}
  </div>
);


const AdminHomePage = () => (
  <div>
    <div className="jumbotron paral paralsec">
      <h1 className="display-8 text-center">Admin Homepage</h1>
    </div>
    <h6 className="text-center">Recent Reports:</h6>
    {/* <Reports /> */}

    {/* <div className="tab-wrapper">
      <div className="container">
        <div className="row">
          <Tabs
            defaultActiveKey="companies"
            className="non-nav"
            variant="pills"
          >
            <Tab eventKey="companies" title="Companies">
              <div className="tab-item-wrapper">
                <br></br>
                <h4 className="text-center">Companies List</h4>
                <Companies />
              </div>
            </Tab>
            <Tab eventKey="reports" title="Reports">
              <div className="tab-item-wrapper">
                <br></br>
                <h4 className="text-center">Reports List</h4>
                <Reports />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div> */}
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
