import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../Session';
import { BuildingList, BuildingDetails } from './index';
import * as ROUTES from '../../../routes';

const BuildingsPage = () => (
  <div>
    <div className="jumbotron paral paralsec">
      <h1 className="display-8 text-center mb-3">Buildings</h1>
    </div>
    <p>The Buildings Page is accessible by every signed in user.</p>

    <Switch>
      <Route exact path={ROUTES.BUILDINGS} component={BuildingList} />
      <Route exact path={ROUTES.BUILDING_DETAILS} component={BuildingDetails} />
    </Switch>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(BuildingsPage);
