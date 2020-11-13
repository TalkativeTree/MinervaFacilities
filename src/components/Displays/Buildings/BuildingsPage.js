import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../Session';
import { BuildingList, BuildingDetails } from './index';
import * as ROUTES from '../../../routes';

const BuildingsPage = () => (
  <div>
    <h1>Buildings Page</h1>
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
