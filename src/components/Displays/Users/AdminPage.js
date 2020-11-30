import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../../routes';
import { withAuthorization, withEmailVerification } from '../../Session';
import { UserList, UserItem } from './index';

const AdminPage = () => (
  <div>
    <div className="jumbotron paral paralsec">
      <h1 className="display-8 text-center mb-3">Admin</h1>
    </div>
    <Switch>
      <Route exact path={ROUTES.ADMIN} component={UserList} />
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
    </Switch>
  </div>
);

const condition = (authUser) => authUser.roles === 'ADMIN';

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
