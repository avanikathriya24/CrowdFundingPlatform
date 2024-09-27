import React from 'react';
import './../Home.css'; // Assuming you have CSS styles for this component

const VideoSection = () => {
  return (
    <section className="section-m1">
      <h3 style={{ margin: '0 0 0 50px', fontSize: '25px' }}>How GoFundMe works</h3>
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
    </section>
  );
};

export default VideoSection;
