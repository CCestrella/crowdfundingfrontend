import React, { useEffect, useState } from "react";

const RandomPersonImage = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Directly fetch the random image
        setImageUrl("https://random.imagecdn.app/500/150");
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      {imageUrl ? <img src={imageUrl} alt="Random Person" /> : <p>Loading...</p>}
    </div>
  );
};

export default RandomPersonImage;
