import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../../routes';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../../Session';
import { CreateReportForm } from '../../Utils';
import { ReportList, ReportDetails } from './index';


const ReportsPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <div className="jumbotron paral paralsec">
          <h1 className="display-8 text-center mb-3">Reports</h1>
        </div>
        <Switch>
          <Route exact path={ROUTES.REPORTS} component={ReportList} />
          <Route exact path={ROUTES.REPORT_NEW}>
            <CreateReportForm authUser={authUser} />
          </Route>
          <Route exact path={ROUTES.REPORT_DETAILS} component={ReportDetails} />
        </Switch>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(ReportsPage);
