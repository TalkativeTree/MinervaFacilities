import React from 'react';
import { Link } from 'react-router-dom';
import { HOME } from '../../routes';

const LandingPage = () => (
  <div className="container landing-container">
    <Link to={{ pathname: HOME }}>
      <img
        className="landing-logo square fade-in" alt="logo"
        src="https://github.com/ChrisBarnes7404/React-WebBased-MVP/blob/master/public/images/minerva-transparent-vector.png?raw=true"
      />
      <p className="title">Minerva Facilities</p>
    </Link>
  </div>
);

export default LandingPage;
