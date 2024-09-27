import React from 'react';
import './GreenSection.css'; // Assuming you have CSS styles for this component
import './../Home.css'; 

const GreenSection = () => {
  return (
    <section className="green">
      <div>
        <p style={{ fontSize: '40px' }}>We've got you covered.</p>
        <br />
        <p style={{ fontSize: '40px' }}>
          GoFundMe is a trusted leader in online fundraising. With simple pricing and a team of Trust & Safety experts in your corner, you can raise money or make a donation with peace of mind.
        </p>
      </div>
    </section>
  );
};

export default GreenSection;
