import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../../routes';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../../Session';
import { CreateCompanyForm } from '../../Utils';
import { CompanyList, CompanyDetails } from './index';

const CompaniesPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <div className="jumbotron paral paralsec">
          <h1 className="display-8 text-center mb-3">Companies</h1>
        </div>

        <Switch>
          <Route exact path={ROUTES.COMPANIES} component={CompanyList} />
          <Route exact path={ROUTES.COMPANY_NEW}>
            <CreateCompanyForm authUser={authUser} />
          </Route>
          <Route exact path={ROUTES.COMPANY_DETAILS} component={CompanyDetails} />
        </Switch>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(CompaniesPage);
