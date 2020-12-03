import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../../routes';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../../Session';
import { CreateRoomForm } from '../../Utils';
import { RoomList, RoomDetails } from './index';


const RoomsPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <div className="jumbotron paral paralsec">
          <h1 className="display-8 text-center mb-3">Rooms</h1>
        </div>

        <Switch>
          <Route exact path={ROUTES.ROOMS} component={RoomList} />
          <Route exact path={ROUTES.ROOM_NEW}>
            <CreateRoomForm authUser={authUser} />
          </Route>
          <Route exact path={ROUTES.ROOM_DETAILS} component={RoomDetails} />
        </Switch>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(RoomsPage);
