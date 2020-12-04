import React from 'react';
import { Link } from 'react-router-dom';
import { HOME } from '../../routes';
import Logo from '../../images/minerva-transparent-vector.png';

const LandingPage = () => (
  <div className="container landing-container">
    <Link to={{ pathname: HOME }}>
      <img
        className="landing-logo square fade-in" alt="logo"
        src={Logo}
      />
      <p className="title">Minerva Facilities</p>
    </Link>
  </div>
);

export default LandingPage;
