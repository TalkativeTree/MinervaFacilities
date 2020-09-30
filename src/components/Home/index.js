import React from 'react';
import { compose } from 'recompose';
import Body from '../App/index';
import { Tabs, Tab } from 'react-bootstrap';
import { withAuthorization, withEmailVerification } from '../Session';

import Buildings from '../Buildings';
import Reports from '../Reports';

const HomePage = () => (
  <div>
    <div className="jumbotron paral paralsec">
      <h1 className="display-8 text-center">Home</h1>
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
                <h4 className="text-center">Facilities List</h4>
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

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
