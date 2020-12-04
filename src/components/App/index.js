import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthUserContext, withAuthentication } from '../Session';
import * as ROUTES from '../../routes';

import Navigation from '../Navigation';

import { SignUpPage, SignInPage, PasswordForgetPage } from '../Auth';

import {
  LandingPage,
  NotFoundPage,
  AccountPage,
  AdminPage,
  CompaniesPage,
  BuildingsPage,
  FloorsPage,
  RoomsPage,
  ReportsPage,
} from '../Displays';

const App = () => (
  <Router>
    <div>
    <div className="hidden text-center"> 
      <div className="row desktop-banner">
        <div className="col">
        <img
        className="littler-square" alt="logo"
        src="https://github.com/ChrisBarnes7404/React-WebBased-MVP/blob/master/public/images/minerva-transparent-clean.png?raw=true"
      />
          <h3>
            <br></br>
            Visit us on mobile to get the full experience!
          </h3>
        </div>
      </div>
    </div>
    <div className="site-content">
      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser ? (
            <Switch>
              <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

              <Route path={ROUTES.ADMIN} component={AdminPage} />
              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route path={ROUTES.COMPANIES} component={CompaniesPage} />
              <Route path={ROUTES.BUILDINGS} component={BuildingsPage} />
              <Route path={ROUTES.FLOORS} component={FloorsPage} />
              <Route path={ROUTES.ROOMS} component={RoomsPage} />
              <Route path={ROUTES.REPORTS} component={ReportsPage} />

              <Route exact path={ROUTES.HOME}>
                <Redirect to={ROUTES.REPORTS} />
                {/* <HomePage /> */}
              </Route>
              <Route exact path={ROUTES.LANDING}>
                <Redirect to={ROUTES.HOME} />
              </Route>
              <Route path={ROUTES.SIGN_UP}>
                <Redirect to={ROUTES.HOME} />
              </Route>
              <Route path={ROUTES.SIGN_IN}>
                <Redirect to={ROUTES.HOME} />
              </Route>

              <Route path={ROUTES.NOT_FOUND} component={NotFoundPage} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

              <Route path={ROUTES.HOME}>
                <Redirect to={ROUTES.SIGN_IN} />
              </Route>
              <Route path={ROUTES.ADMIN}>
                <Redirect to={ROUTES.SIGN_IN} />
              </Route>
              <Route path={ROUTES.ACCOUNT}>
                <Redirect to={ROUTES.SIGN_IN} />
              </Route>
              <Route path={ROUTES.COMPANIES}>
                <Redirect to={ROUTES.SIGN_IN} />
              </Route>
              <Route path={ROUTES.BUILDINGS}>
                <Redirect to={ROUTES.SIGN_IN} />
              </Route>
              <Route path={ROUTES.FLOORS}>
                <Redirect to={ROUTES.SIGN_IN} />
              </Route>
              <Route path={ROUTES.ROOMS}>
                <Redirect to={ROUTES.SIGN_IN} />
              </Route>
              <Route path={ROUTES.REPORTS}>
                <Redirect to={ROUTES.SIGN_IN} />
              </Route>

              <Route path={ROUTES.NOT_FOUND} component={NotFoundPage} />
            </Switch>
          )
        }
      </AuthUserContext.Consumer>

      <Navigation />
      </div>
    </div>
  </Router>
);

export default withAuthentication(App);
