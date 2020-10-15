import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <div className="tab-wrapper">
    <div className="container">
      <div className="row">
        <nav defaultactivekey="/">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {/* <Link
              className="nav-item nav-link "
              id="nav-landing-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-landing"
              aria-selected="true"
              to={ROUTES.LANDING}
            >
              Landing
            </Link> */}
            <Link
              className="nav-item nav-link"
              id="nav-home-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-home"
              aria-selected="false"
              to={ROUTES.HOME}
            >
              <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link
              className="nav-item nav-link"
              id="nav-account-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-account"
              aria-selected="false"
              to={ROUTES.ACCOUNT}
            >
              Account
            </Link>
            {/* <Link
              className="nav-item nav-link"
              id="nav-companies-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-companies"
              aria-selected="false"
              to={ROUTES.COMPANIES}
            >
              Companies
            </Link>
            <Link
              className="nav-item nav-link"
              id="nav-buildings-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-buildings"
              aria-selected="false"
              to={ROUTES.BUILDINGS}
            >
              Buildings
            </Link> */}
            <Link
              className="nav-item nav-link"
              id="nav-floors-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-floors"
              aria-selected="false"
              to={ROUTES.FLOORS}
            >
              Floors
            </Link>
            <Link
              className="nav-item nav-link"
              id="nav-rooms-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-rooms"
              aria-selected="false"
              to={ROUTES.ROOMS}
            >
              Rooms
            </Link>

            {!!authUser.roles[ROLES.ADMIN] && (
              <Link
                className="nav-item nav-link"
                id="nav-admin-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="nav-admin"
                aria-selected="false"
                to={ROUTES.ADMIN}
              >
                Admin
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <ul>
    <li className="row">
      {' '}
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li className="row">
      {' '}
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
