import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for styling

const Footer = () => {
  return (
    <footer className="section-m1">
      <div className="col">
        <img className="logo" id="logo" src="img/logo.png" alt="Logo" />
      </div>
      <div className="col">
        <h4>Fundraise for</h4>
        <a href="#">Medical</a>
        <a href="#">Emergency</a>
        <a href="#">Memorial</a>
        <a href="#">Education</a>
        <a href="#">Charity</a>
      </div>
      <div className="col">
        <h4>Learn more</h4>
        <a href="#">How CrowdFunding Works</a>
        <a href="#">Success stories</a>
        <a href="#">Supported countries</a>
        <a href="#">Charity fundraising</a>
        <a href="#">Corporate fundraising</a>
        <a href="#">Event fundraising</a>
      </div>
      <div className="col">
        <h4></h4>
        <a href="/contact_us">Help center</a>
        <a href="#">Your Fundraiser</a>
        <a href="#">Your Donation </a>
      </div>
    </footer>
  );
};

export default Footer;
