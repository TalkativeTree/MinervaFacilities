import React from 'react';
import { compose } from 'recompose';
import { Tabs, Tab } from 'react-bootstrap';
import '../App/index.css';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';

import Reports from '../Reports';
import Companies from '../Companies';
import Buildings from '../Buildings';
import Floors from '../Floors';

const HomePage = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser.roles.ADMIN ? (
        <AdminHomePage />
      ) : authUser.roles.companyRole === "ADMIN" || "MANAGER" ? (
        <ManagerHomePage />
      ) : (
        <EmployeeHomePage />
      )
    }
  </AuthUserContext.Consumer>
);

const EmployeeHomePage = () => (
  <div>
    <div className="jumbotron paral paralsec">
      <h1 className="display-8 text-center">Employee Homepage</h1>
    </div>
    <div className="tab-wrapper">
      <div className="container">
        <div className="row">
          <Tabs
            defaultActiveKey="floors"
            className="non-nav"
            variant="pills"
          >
            <Tab eventKey="floors" title="Floors">
              <div className="tab-item-wrapper">
                <h4 className="text-center">Floors List</h4>
                <Floors />
              </div>
            </Tab>
            <Tab eventKey="reports" title="Reports">
              <div className="tab-item-wrapper">
                <h4 className="text-center">Reports List</h4>
                <Reports />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
);

const ManagerHomePage = () => (
  <div>
    <div className="jumbotron paral paralsec">
      <h1 className="display-8 text-center">Manager Homepage</h1>
    </div>
    <div className="tab-wrapper">
      <div className="container">
        <div className="row">
          <Tabs
            defaultActiveKey="buildings"
            className="non-nav"
            variant="pills"
          >
            <Tab eventKey="buildings" title="Buildings">
              <div className="tab-item-wrapper">
                <h4 className="text-center">Buildings List</h4>
                <Buildings />
              </div>
            </Tab>
            <Tab eventKey="reports" title="Reports">
              <div className="tab-item-wrapper">
                <h4 className="text-center">Reports List</h4>
                <Reports />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
);

const AdminHomePage = () => (
  <div>
    <div className="jumbotron paral paralsec">
      <h1 className="display-8 text-center">Admin Homepage</h1>
    </div>
    <div className="tab-wrapper">
      <div className="container">
        <div className="row">
          <Tabs
            defaultActiveKey="companies"
            className="non-nav"
            variant="pills"
          >
            <Tab eventKey="companies" title="Companies">
              <div className="tab-item-wrapper">
                <h4 className="text-center">Companies List</h4>
                <Companies />
              </div>
            </Tab>
            <Tab eventKey="reports" title="Reports">
              <div className="tab-item-wrapper">
                <h4 className="text-center">Reports List</h4>
                <Reports />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
