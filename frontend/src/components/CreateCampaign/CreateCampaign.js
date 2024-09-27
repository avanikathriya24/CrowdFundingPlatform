// src/components/CreateCampaign/CreateCampaign.js
import './CreateCampaign.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../context/FormContext';

const CreateCampaign = () => {
  const { formData, setFormData } = useFormContext();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isLoggedIn = () => {
    const cookies = document.cookie.split(';');
    const userIdCookie = cookies.find(cookie => cookie.trim().startsWith('userId='));
    return userIdCookie ? true : false;
  };

  const isFormValid = () => {
    return formData.country && formData.postcode && formData.description;
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (!isLoggedIn()) {
      alert("Please sign in to create a campaign.");
      navigate('/sign_in');
    } else if (!isFormValid()) {
      setErrorMessage("Please fill all fields before continuing.");
    } else {
      setErrorMessage("");
      navigate('/step1');
    }
  };

  return (
    <div className="outer">
      <div id="outer-div">
        <div className="space">
          <h1>Let's begin your fundraising journey!</h1>
          <p>We're here to guide you every step of the way.</p>
        </div>
      </div>

      <div className="inner">
        <header className='header1'>
          <a href="/sign_in">Sign in</a>
        </header>

        <div className="space1">
          <h2>Where will the funds go?</h2>
          <p style={{ fontSize: '12px' }}>Choose the location where you plan to withdraw your funds.</p>
          <form onSubmit={handleContinue}>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            >
              <option value="" disabled hidden>Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              <option value="Russia">Russia</option>
              <option value="China">China</option>
              <option value="Korea">Korea</option>
              <option value="Bulgaria">Bulgaria</option>
            </select>
            <input
              id="postcode"
              name="postcode"
              type="text"
              value={formData.postcode}
              onChange={handleInputChange}
              placeholder="Postcode"
            />

            <h2>What best describes why you're fundraising?</h2>
            <div className="options">
              {['Animals', 'Business', 'Community', 'Competition', 'Creative', 'Emergencies', 'Environment', 'Education', 'Faith', 'Family', 'Funerals_&_Memorials', 'Medical', 'MonthlyBills', 'Newlyweds', 'Sports', 'Travel', 'Volunteer', 'Wishes', 'Other'].map(option => (
                <label key={option}>
                  <input
                    style={{margin:'25px'}}
                    type="radio"
                    name="description"
                    value={option}
                    checked={formData.description === option}
                    onChange={handleInputChange}
                  />
                  {option}
                </label>
              ))}
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <footer>
              <button type="submit">Continue</button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
