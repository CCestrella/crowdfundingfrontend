import React, { useEffect, useState } from "react";
import "./BackgroundSlideshow.css";


const images = [
    "https://i.ibb.co/yVqTdJH/4ed2379f59480971-800.jpg",
    "https://i.ibb.co/wBJh5K6/9b7f8555-8486-499d-be90-7bca26bb0cd3-AP-Tokyo-Olympics-Weightlifting-Women-1539105825.jpg",
    "https://i.ibb.co/vX7kJKC/2021-07-24-T112040-Z-1949862180-SP1-EH7-O0-V7-UUI-RTRMADP-3-OLYMPICS-2020-GAR-M-1-APSR-QUAL-000003-1.jpg",
    "https://i.ibb.co/pxY33LS/2023-05-08-T121300-Z-1432513959-UP1-EJ580-XXM6-A-RTRMADP-3-GAMES-SEA-scaled-1811557600.jpg",
    "https://i.ibb.co/PW99R0S/000-9-JJ62-V-scaled.jpg"
];

const BackgroundSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="background-slideshow"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="slideshow-content">
        <h1>Bringing the Dreams of Young Filipino Athletes Closer to Reality!</h1>
        <button className="cta-button">Start a Fundraiser!</button>
        <p>For individuals and charities. No startup fees. No hidden fees.</p>
      </div>
    </div>
  );
};

export default BackgroundSlideshow;
