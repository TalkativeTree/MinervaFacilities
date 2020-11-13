import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import '../App/index.css';

const LandingPage = () => (
  <div className="container landing-container">
    <Link to={{ pathname: `${ROUTES.SIGN_IN}` }}>
      <img
        className="landing-logo square fade-in"
        src="https://github.com/ChrisBarnes7404/React-WebBased-MVP/blob/master/public/images/minerva-transparent-vector.png?raw=true"
      />
      <p className="title">Minerva Facilities</p>
    </Link>
  </div>
);

export default LandingPage;
