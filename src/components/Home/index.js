import React from 'react';
import { compose } from 'recompose';
import Body from '../App/index';

import { withAuthorization, withEmailVerification } from '../Session';
import Reports from '../Reports';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <Reports />
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
