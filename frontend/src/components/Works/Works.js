import React, { useState, useEffect } from 'react';

import './Works.css'; // Import CSS file for styling

const testimonials = [
    {
      content: "“This was my first time creating a CrowdFund for a dear friend of mine who has a recurrence of cancer and her family is in financial straits. We were amazed at how easy it was to set up the CrowdFund and manage it. My friend and her family were SO appreciative.”",
      backgroundColor: "#d2f3f3"
    },
    {
      content: "CrowdFund helped me and my mother when she most needed. It gave confidence to [people] wanting to donate.”",
      backgroundColor: "#ffeeee"
    },
    {
      content: "“I’ve used CrowdFund for various fundraising campaigns over the years for nonprofit work to memorials to breast cancer support. It is such a simple way to get and garner support for a broad range of projects.”",
      backgroundColor: "#e6e3f3"
    },
    
  ];
  
  const Works = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
  
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % testimonials.length);
      }, 5000);
  
      return () => clearInterval(intervalId);
    }, []);
   
  
    const nextSlide = () => {
      setCurrentSlide((currentSlide + 1) % testimonials.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((currentSlide - 1 + testimonials.length) % testimonials.length);
    };
  
    const setSlide = (index) => {
      setCurrentSlide(index);
    };
  
    
  return (
    <section>
      <div className="section-p">
        <p className="main-heading">
          How CrowdFunding Works
        </p>
        <p className="description">
          CrowdFund is the trusted place to fundraise for what you care about. There is no pressure to hit your fundraising goal and we have created tools to make it easy for donors to contribute to your fundraiser. Learn step-by-step what you need to get started—from writing your story and sharing your fundraiser to setting up bank transfers.
        </p>
        <div className="section-m1">
          <iframe
            width="100%"
            height="600px"
            src="https://www.youtube.com/embed/v5wbODeVHC8?si=Vi4lERy4WJnpYP6e"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* review carousal */}
      <section className="carousel-section">
        <div className="carousel">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`carousel-content ${index === currentSlide ? 'active' : ''}`}
            >
              <div
                className="testimonial-block"
                style={{ backgroundColor: testimonial.backgroundColor }}
              >
                <div className="customer-section">
                  <img src="img/review.webp" alt="" />
                </div>
                <p className="testimonial-content">{testimonial.content}</p>
              </div>
              <div className="testimonial-summary responsive">
                <h2>Here’s what people are saying </h2>
                <h2>about CrowdFund</h2>
              </div>
            </div>
          ))}
          <button className="prev-arrow" onClick={prevSlide}>&#10094;</button>
          <button className="next-arrow" onClick={nextSlide}>&#10095;</button>
        </div>
        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setSlide(index)}
            ></span>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Works;
