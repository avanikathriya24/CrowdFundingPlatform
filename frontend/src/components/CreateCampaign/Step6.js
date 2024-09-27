// src/components/CreateCampaign/Step6.js
import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import './CreateCampaign.css';

const Step6 = () => {
  const { formData } = useFormContext();
  const navigate = useNavigate();

  const handleLaunchFundraiser = async () => {
    const cookies = document.cookie.split(';');
    const userIdCookie = cookies.find(cookie => cookie.trim().startsWith('userId='));
    const userId = userIdCookie ? userIdCookie.split('=')[1] : null;

    if (!userId) {
      alert('Please sign in to create a campaign.');
      navigate('/sign_in');
      return;
    }

    try {
      await axios.post('http://localhost:8000/create_campaign/', {
        ...formData,
        userId: userId
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error launching fundraiser:', error);
      alert('Failed to launch fundraiser. Please try again.');
    }
  };

  return (
    <div className="outer">
      <div id="outer-div">
        <div className="space">
          <h1>You’re ready to start fundraising</h1>
        </div>
      </div>      
      <div className="inner">
        <header className="header1"></header>
        <div className="space1">
          <div className="image-container">
            <h3>Cover Media</h3>
            {formData.step3 ? (
              <img src={formData.step3} alt="Uploaded" className="uploaded-image" />
            ) : (
              <p>No image uploaded</p>
            )}
          </div>
          <hr />

          <div>
            <h3>Title</h3>
            <p>{formData.step5}</p>
          </div>
          <hr />

          <div>
            <h3>Goal</h3>
            <p>{formData.step2}</p>
          </div>
          <hr />

          <div>
            <h3>Category</h3>
            <p>{formData.description}</p>
          </div>
          <hr />

          <div>
            <h3>Location</h3>
            <p>{formData.postcode}</p>
          </div>
          <hr />

          <div>
            <h3>Story</h3>
            <p>{formData.step4}</p>
          </div>
          <hr />

          <footer>
            <button 
              className="launch-button"
              onClick={handleLaunchFundraiser}
            >
              Launch Fundraiser
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Step6;
