import React from 'react';
import '../App/index.css';

const Landing = () => (
  <div>
    <Body />
  </div>
);

const Body = () => {
  return (
    <div id="body">
      <Header />
      <Card />
      {/* <ContactContainer /> */}
    </div>
  );
};

const Header = () => {
  return (
    <div className="header container">
      <span className="header-title">Minerva Facilities</span>
      <br />
      <span className="header-text">
        Bringing Wisdom to the workplace...
      </span>
    </div>
  );
};

const Card = (props) => {
  return (
    <div className={props.className}>
      <div className="small-div">
        <i className={props.className}></i>
        <img src={props.img} alt="test" />
      </div>

      <div className="big-div">
        <span className="div-title">{props.title}</span>
        <br />
        <span>{props.description}</span>
      </div>
    </div>
  );
};
export default Landing;
