import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../Session';
import { RoomList, RoomDetails } from '.';
import * as ROUTES from '../../../routes';

const RoomsPage = () => (
  <div>
    <h1>Rooms Page</h1>
    <p>The Rooms Page is accessible by every signed in user.</p>

    <Switch>
      <Route exact path={ROUTES.ROOMS} component={RoomList} />
      <Route exact path={ROUTES.ROOM_DETAILS} component={RoomDetails} />
    </Switch>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(RoomsPage);
