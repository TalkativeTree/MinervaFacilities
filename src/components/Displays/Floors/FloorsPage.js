import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../../Session';
import { CreateFloorForm } from '../../Utils';
import { FloorList, FloorDetails } from './index';
import * as ROUTES from '../../../routes';

const FloorsPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <div className="jumbotron paral paralsec">
          <h1 className="display-8 text-center mb-3">Floors</h1>
        </div>
        <Switch>
          <Route exact path={ROUTES.FLOORS} component={FloorList} />
          <Route exact path={ROUTES.FLOOR_NEW}>
            <CreateFloorForm authUser={authUser} />
          </Route>
          <Route exact path={ROUTES.FLOOR_DETAILS} component={FloorDetails} />
        </Switch>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(FloorsPage);
