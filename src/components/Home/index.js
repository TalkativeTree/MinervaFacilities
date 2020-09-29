import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

import Buildings from '../Buildings';
import Reports from '../Reports';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <h2>Building List</h2>
    <Buildings />
    <hr />
    <h2>Reports List</h2>
    <Reports />

  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
