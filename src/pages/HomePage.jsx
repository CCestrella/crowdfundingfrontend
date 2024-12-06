import React from "react";
import BackgroundSlideshow from "../components/BackgroundSlideshow";
import "./HomePage.css";
import AthleteCard from "../components/AthleteCard";
import "../components/AthleteCard.css";
import athletes from "../data";
import useProjects from "../hooks/use-projects";

const HomePage = () => {
  const { athlete } = useProjects();

  return (
    <div>
      <BackgroundSlideshow />
      <div id="app" className="crowd-funding">
        <div className="crowd-funding__header">
          <div className="crowd-funding__header__description">
            <h1>HOME OF THE CHAMPIONS</h1>
            <hr className="section-divider" />
            <p>
              In the <span>2023 Southeast Asian Games</span>, nearly
              <span>40%</span> of the Philippine delegation were under the age of 25,
              showcasing the country's reliance on its youth for future athletic success.
            </p>
            <p>
              <span>Carlos Yulo</span>, a former young athlete, became the 2019 World Champion
              in gymnastics at just 19 years old, inspiring countless Filipino youth.
            </p>
            <p>
              The Philippine esports scene is dominated by young talents aged
              <span>16–24</span>. Team Sibol, made up of youth players, won gold in the SEA
              Games 2019 Mobile Legends event.
            </p>
          </div>

          <div className="button">
            <strong>
              <small>Donate Now</small>
            </strong>
          </div>
        </div>
      </div>
      {/* Athlete Cards Section */}
      <div className="athlete-cards-container">
        {athletes.map((athlete) => (
          <AthleteCard key={athlete.id} athleteData={athlete} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
