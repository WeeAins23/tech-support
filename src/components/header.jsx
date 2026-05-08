import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
// props.data contains the 'title', 'paragraph', and 'image' that this header will display
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
              <p>
                {/* Displays the description text passed in via props */}
                {props.data ? props.data.paragraph : "Loading"}
              </p>
              {/* Call to Action: A large button that directs users to the registration page */}
              <Link to="/register" className="btn btn-custom btn-lg">Start your journey here</Link>
            </div>
          </div>
        </div>

        {/* Hero image section*/}
        <div className="hero-image">
          <img
          // Dynamically sets the image source based on the props data
            src={props.data ? props.data.image : "Loading"}
            alt="a man operating a computer"
            // img-responsive: A Bootstrap class that makes the image scale with the size of the user's screen
            className="img-responsive"
          />
        </div>
        {/* Manual spacer at the bottom of the page*/}
        <div style={{ height: '100px' }}></div>
      </div>
    </header>
  );
};
export { Header };