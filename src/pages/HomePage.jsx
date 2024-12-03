import React from "react";
import BackgroundSlideshow from "../components/BackgroundSlideshow";
import "./HomePage.css";
import AthleteCard from "../components/AthleteCard";
import "../components/AthleteCard.css";
import athletes from "../data";



const HomePage = () => {
  return (
    <div>
      <BackgroundSlideshow />
      <div id="app" className="crowd-funding">
        <div className="crowd-funding__header">
          <div className="crowd-funding__header__description">
            <h1>POPULAR ATHLETES</h1>
            <p>Bringing the dreams of young Filipino athletes closer to reality</p>
          </div>
        </div>
        {/* Athlete Cards Section */}
        <div className="athlete-cards-container">
          {athletes.map((athlete) => (
            <AthleteCard key={athlete.id} athleteData={athlete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
