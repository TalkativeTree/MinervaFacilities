import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../../Session';
import { CreateBuildingForm } from '../../Utils';
import { BuildingList, BuildingDetails } from './index';
import * as ROUTES from '../../../routes';


const BuildingsPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <div className="jumbotron paral paralsec">
          <h1 className="display-8 text-center mb-3">Buildings</h1>
        </div>

        <Switch>
          <Route exact path={ROUTES.BUILDINGS} component={BuildingList} />
          <Route exact path={ROUTES.BUILDING_NEW}>
            <CreateBuildingForm authUser={authUser} />
          </Route>
          <Route exact path={ROUTES.BUILDING_DETAILS} component={BuildingDetails} />
        </Switch>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(BuildingsPage);
