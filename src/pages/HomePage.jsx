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
      {/* Background Slideshow */}
      <BackgroundSlideshow />

      {/* Header Section */}
      <div id="app" className="crowd-funding">
        <div className="crowd-funding__header__description">
          <h1>HOME OF THE CHAMPIONS</h1>
          <hr className="section-divider" />
          <p>
            In the <span>2023 Southeast Asian Games</span>, nearly
            <span> 40%</span> of the Philippine delegation were under the age of
            25, showcasing the country's reliance on its youth for future
            athletic success.
          </p>
          <p>
            From Carlos Yulo becoming a world champion at 19 to Team Sibol's
            youthful dominance in esports, the spirit of the Philippines' youth
            burns bright in the realm of sports.
          </p>
          <p>
            <span>Champs Fund - </span>A crowdfunding platform dedicated to
            supporting aspiring young athletes in the Philippines who
            demonstrate exceptional talent but lack the financial means to
            participate in national competitions. Our platform will bridge the
            gap between passionate sports enthusiasts and these promising
            athletes, providing an avenue to directly contribute to their
            dreams and ambitions.
          </p>
          <p>
            Champs Fund platform specifically focuses on supporting aspiring
            young athletes between the ages of 5-18 years old, helping them to
            overcome financial barriers and pursue their potential in sports.
          </p>
          <p>
            Through Champs Fund, we’re proving that with a little help, the next
            champion could be just a click away. Together, we’re transforming
            potential into podium finishes.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="button-container">
          <button className="button">
            <strong>
              <small>Donate Now</small>
            </strong>
          </button>
        </div>
      </div>

      {/* Athlete Cards Section */}
      <div className="athlete-cards-container">
        {athletes.map((athlete) => (
          <AthleteCard key={athlete.id} athleteData={athlete} />
        ))}
      </div>

      {/* Footer Section */}
      <footer className="site-footer">
        <div className="container">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2024 All Rights Reserved by{" "}
              <a href="#">Christin Estrella</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
