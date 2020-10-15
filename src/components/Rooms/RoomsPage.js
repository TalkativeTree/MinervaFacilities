import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { RoomList, RoomItem } from '../Rooms';
import * as ROUTES from '../../constants/routes';

const RoomsPage = () => (
  <div>
    <Switch>
      <Route exact path={ROUTES.HOME} component={RoomList} />
      <Route exact path={ROUTES.ROOM_DETAILS} component={RoomItem} />
    </Switch>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(RoomsPage);
