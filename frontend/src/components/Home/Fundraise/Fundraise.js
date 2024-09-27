import React from 'react';
import './../Home.css'; 

const Fundraise = () => {
  return (
    <section style={{ marginBottom: '150px' }} className="section-m1">
      <h3 style={{ margin: '50px 0 50px 50px', fontSize: '25px' }}>Fundraise for anyone</h3>
      <div className="section-m1">
        <h2>Yourself</h2>
        <p>Funds are delivered to your bank account for your own use</p>
      </div>
      <hr />
      <div className="section-m1">
        <h2>Friends and Family</h2>
        <p>You'll invite a beneficiary to receive funds or distribute them yourself</p>
      </div>
      <hr />
      <div className="section-m1">
        <h2>Charity</h2>
        <p>Funds are delivered to your chosen charity for you</p>
      </div>
      <hr />
    </section>
  );
};

export default Fundraise;
