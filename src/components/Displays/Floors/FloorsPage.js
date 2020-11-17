import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../Session';
import { FloorList, FloorDetails } from './index';
import * as ROUTES from '../../../routes';

const FloorsPage = () => (
  <div>
    <div className="jumbotron paral paralsec">
      <h1 className="display-8 text-center mb-3">Floors</h1>
    </div>
    <p>The Floors Page is accessible by every signed in user.</p>
    <div className="container">
    <Switch>
      <Route exact path={ROUTES.FLOORS} component={FloorList} />
      <Route exact path={ROUTES.FLOOR_DETAILS} component={FloorDetails} />
    </Switch>
    </div>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(FloorsPage);
