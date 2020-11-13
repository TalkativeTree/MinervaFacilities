import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PageNotFound from "../assets/images/PageNotFound";

class NotFoundPage extends Component {
  render() {
    return (
      <div id="content-wrap" className="NotFoundPage">
        {/* <img src={PageNotFound} /> */}
        <h1>Oops!</h1>
        <h2>We can't seem to find the page you're looking for.</h2>
        <p style={{ textAlign: "center" }}>
          <Link to="/">Go to Home </Link>
        </p>
      </div>
    );
  }
}

export default NotFoundPage;
