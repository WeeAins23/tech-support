import React from "react";
import { Link } from "react-router-dom";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        {/* Text content stays inside the container to stay centered */}
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 intro-text">
              <h1>
                {props.data ? props.data.title : "Loading"}
                <span></span>
              </h1>
              <p>{props.data ? props.data.paragraph : "Loading"}</p>
              <Link to="/register" className="btn btn-custom btn-lg">Start your journey here</Link>
            </div>
          </div>
        </div>

        {/* Hero image section*/}
        <div className="hero-image">
          <img
            src={props.data ? props.data.image : "Loading"}
            alt="a man operating a computer"
            className="img-responsive"
          />
        </div>
      </div>
    </header>
  );
};
