import React from "react";
import BackgroundSlideshow from "../components/BackgroundSlideshow";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <BackgroundSlideshow />
      <div id="app" className="crowd-funding">
        <div className="crowd-funding__header">
          <div className="crowd-funding__header__description">
            <h1>HELP!</h1>
            <p>Bringing the dreams of young Filipino athletes closer to reality</p>
            <div className="hashtags">#puppy #crowdfunding #winter #dogs #help</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
