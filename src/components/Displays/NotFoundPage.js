import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HOME } from "../../routes";

class NotFoundPage extends Component {
  render() {
    return (
      <div id="content-wrap" className="container pt-5" style={{ textAlign: 'center' }}>
        <h1>Oops!</h1>
        <h2>We can't find the page you're looking for.</h2>
        <p>
          <Link to={HOME}><button className="btn btn-secondary">Go to Home Kid</button></Link>
        </p>
      </div>
    );
  }
}

export default NotFoundPage;
