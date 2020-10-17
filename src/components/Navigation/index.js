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
        <nav defaultactivekey="/home">
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

            {!!authUser.company_id && (
              <Link
                className="nav-item nav-link"
                id="nav-buildings-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="nav-buildings"
                aria-selected="false"
                to={{pathname: `${ROUTES.COMPANIES}`
                  // pathname: `${ROUTES.COMPANIES}/${authUser.company_id}`,
                  // state: { company },
                }}
              >
                My Company
              </Link>
            )}
            {!!authUser.company_id && (
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
            )}

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
  <div className="tab-wrapper">
    <div className="container">
      <div className="row">
        <nav defaultactivekey="/">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <Link
              className="nav-item nav-link "
              id="nav-landing-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-landing"
              aria-selected="true"
              to={ROUTES.LANDING}
            >
              Landing
            </Link>
            <Link
              className="nav-item nav-link "
              id="nav-signup-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-signup"
              aria-selected="true"
              to={ROUTES.SIGN_UP}
            >
              Sign Up
            </Link>

            <Link
              className="nav-item nav-link "
              id="nav-signin-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-signin"
              aria-selected="true"
              to={ROUTES.SIGN_IN}
            >
              Sign In
            </Link>

            <Link
              className="nav-item nav-link "
              id="nav-forgotpassowrd-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-forgotpassword"
              aria-selected="true"
              to={ROUTES.PASSWORD_FORGET}
            >
              Forgot Password
            </Link>
          </div>
        </nav>
      </div>
    </div>
  </div>
);

export default Navigation;
