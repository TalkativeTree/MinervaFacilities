import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { withAuthentication } from '../Session';
import * as ROUTES from '../../routes';


import Navigation from '../Navigation';

import {
  SignUpPage,
  SignInPage,
  PasswordForgetPage,
} from '../Auth';

import {
  LandingPage,
  NotFoundPage,
  HomePage,

  AccountPage,
  AdminPage,

  CompaniesPage,
  BuildingsPage,
  FloorsPage,
  RoomsPage,
  ReportsDetails,
} from '../Displays';

const App = () => (
  <Router>
    <>
    <Switch>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.HOME} component={HomePage} />

      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />

      <Route path={ROUTES.COMPANIES} component={CompaniesPage} />
      <Route path={ROUTES.BUILDINGS} component={BuildingsPage} />
      <Route path={ROUTES.FLOORS} component={FloorsPage} />
      <Route path={ROUTES.ROOMS} component={RoomsPage} />

      <Route path={ROUTES.REPORT_DETAILS} component={ReportsDetails} />
      <Route path={ROUTES.NOT_FOUND} component={NotFoundPage} />
    </Switch>

    <Navigation />
    </>
  </Router>
);

export default withAuthentication(App);