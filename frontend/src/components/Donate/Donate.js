// DonatePage.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Donate.css'; // Import your CSS file


const Donate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { campaign } = location.state || {}; // Get the campaign from location state
  const [donationAmount, setDonationAmount] = useState('');

  const handleDonateSubmit = async () => {
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      // Make sure to use campaign.id here
      const response = await fetch(`http://localhost:8000/donate/${campaign.campaign_id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: donationAmount }),
      });

      if (response.ok) {
        alert("Thank you for your donation!");
        navigate(`/campaign/${campaign.campaign_id}`); // Navigate back to CampaignInfo page
      } else {
        const errorData = await response.text();
        console.error('Failed to donate:', errorData);
      }
    } catch (error) {
      console.error('Error during donation:', error);
    }
  };

  return (
    <div className="donate-container">
      <h2>Donate to {campaign.title}</h2>
      <p><strong>Goal:</strong> {campaign.goal}</p>
      <p><strong>Raised:</strong> {campaign.raised}</p>
      <input
        type="number"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
        placeholder="Enter Donation Amount"
      />
      <button onClick={handleDonateSubmit}>Submit Donation</button>
      <button onClick={() => navigate(-1)}>Cancel</button> {/* Go back to the previous page */}
    </div>
  );
};

export default Donate;
