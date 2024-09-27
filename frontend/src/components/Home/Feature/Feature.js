import React from 'react';
import './Feature.css'; // Assuming you have CSS styles for this component
import './../Home.css'; 

const Feature = () => {
  return (
    <section className="feature">
      <h3 style={{ margin: '0 0 0 20px', fontSize: '25px' }}>Featured topics</h3>
      <div className="pro-container">
        <div className="pro">
          <img src="img/campaign/p3.jpg" alt="" />
          <div className="des" style={{ margin: '0 0 0 20px' }}>
            <h4>Make a difference with charity fundraising</h4>
            <p>The quick and easy way to raise money for the charities you care about. Choose a charity, launch your fundraiser, and make a difference today.</p>
            <button>Learn more</button>
          </div>
        </div>
        <div className="pro">
          <img src="img/campaign/p4.jpg" alt="" />
          <div className="des" style={{ margin: '0 0 0 20px' }}>
            <h4>How to fundraise to evacuate civilians from Gaza</h4>
            <p>Responses to frequently asked questions on how to fundraise for relief efforts and what may be required during the Trust & Safety verification process.</p>
            <button>Learn more</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
