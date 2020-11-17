import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withAuthentication } from '../Session';
import * as ROUTES from '../../routes';


import Navigation from '../Navigation';
import NotFound from '../NotFound';
import LandingPage from '../Landing';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import {
  SignUpPage,
  SignInPage,
  PasswordForgetPage,
} from '../Auth';

import {
  CompaniesPage,
  BuildingsPage,
  FloorsPage,
  RoomsPage,
  ReportsDetails,
} from '../Displays';

const App = () => (
  <Router>
    <div>
      <div>
        <div className="tab-content" id="nav-tabContent">


          <div className="tab-pane fade show active" id="nav-landing" role="tabpanel" aria-labelledby="nav-landing-tab" >
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
          </div>

          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />


          <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" >
            <Route path={ROUTES.HOME} component={HomePage} />
          </div>

          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />

          <Route path={ROUTES.COMPANIES} component={CompaniesPage} />
          <Route path={ROUTES.BUILDINGS} component={BuildingsPage} />
          <Route path={ROUTES.FLOORS} component={FloorsPage} />
          <Route path={ROUTES.ROOMS} component={RoomsPage} />

          <Route path={ROUTES.REPORT_DETAILS} component={ReportsDetails} />
          {/* <Route path="*" component={NotFound} /> */}
        </div>

        <Navigation />

      </div>
    </div>
  </Router>
);

export default withAuthentication(App);