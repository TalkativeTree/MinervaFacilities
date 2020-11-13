import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../Session';
import { CompanyList, CompanyDetails } from './index';
import * as ROUTES from '../../../routes';

const CompaniesPage = () => (
  <div>
    <h1>Companies Page</h1>
    <p>The Companies Page is accessible by every signed in user.</p>

    <Switch>
      <Route exact path={ROUTES.COMPANIES} component={CompanyList} />
      <Route exact path={ROUTES.COMPANY_DETAILS} component={CompanyDetails} />
    </Switch>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(CompaniesPage);
