import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { Tabs, Tab } from 'react-bootstrap';
import '../App/index.css';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';

import * as ROUTES from '../../constants/routes';

import Reports from '../Reports';
import Companies from '../Creators/Companies';
import Buildings from '../Creators/Buildings';
import Floors from '../Creators/Floors';
import FloorDetails from '../Floors/FloorDetails';
import { RoomList, RoomItem } from '../../components/Rooms';

const HomePage = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser.roles.ADMIN ? (
        <AdminHomePage />
      ) : authUser.roles.companyRole === 'OWNER' ||
          authUser.roles.companyRole === 'MANAGER' ? (
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
            defaultActiveKey="reports"
            className="non-nav"
            variant="pills"
          >
            {/* <Tab eventKey="floors" title="Floors">
              <div className="tab-item-wrapper">
                <br></br>
                <Switch>
                  <Route exact path={ROUTES.HOME} component={Floors} />
                  <Route exact path={ROUTES.FLOOR_DETAILS} component={FloorDetails} />
                </Switch>

                {/* <Switch>
                  <Route exact path={ROUTES.HOME} component={RoomList} />
                  <Route exact path={ROUTES.ROOM_DETAILS} component={RoomItem} />
                </Switch> /}
              </div>
            </Tab> */}
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
                <br></br>
                <h4 className="text-center">Buildings List</h4>
                <Buildings />
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
    </div>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
