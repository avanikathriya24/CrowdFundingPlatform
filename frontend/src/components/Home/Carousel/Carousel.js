import React, { useState } from 'react';
import './Carousel.css'; // Assuming you have CSS styles for this component
import './../Home.css'; 

const Carousel = () => {
  // Define the slide data
  const slides = [
    { id: 1,  image: 'img/campaign/1.jpg' },
    { id: 2, image: 'img/campaign/2.jpg' },
    { id: 3, image: 'img/campaign/animal.jpg' }
  ];

  // Set the initial state to show the first slide
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous slide
  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  // Function to go to the next slide
  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section>
      <div className="carousel-container">
        <div className="arrow l" onClick={prev}>
          <img src="img/l.png" alt="Previous" />
        </div>
        <div className="slide1">
          <div className="caption">
            <div><img src={slides[currentIndex].image} alt="Previous" /></div>
          </div>
        </div>
        <div className="arrow r" onClick={next}>
          <img src="img/r.png" alt="Next" />
        </div>
      </div>
    </section>
  );
};

export default Carousel;
