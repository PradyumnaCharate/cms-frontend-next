// plugins/ImageSlider/components/ImageSlider.js
import React, { useEffect, useState } from "react";

import "../styles/slider.css";

function ImageSlider({ settings }) {
  const { images, autoplay, interval, showThumbnails } = settings;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoplay) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoplay, interval, images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="image-slider">
      <div className="slider-image-container">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>
    </div>
  );
}

export default ImageSlider;
