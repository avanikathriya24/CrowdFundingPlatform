// src/components/CreateCampaign/Step1.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormContext } from '../../context/FormContext';
import './CreateCampaign.css';

const Step1 = () => {
  const { formData, setFormData } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setInputValue(location.state.step1 || formData.step1 || '');
    }
  }, [location.state, formData.step1]);

  const handleContinue = () => {
    setFormData({ ...formData, step1: inputValue, selectedOption });
    navigate('/step2');
  };

  const handleBack = () => {
    navigate('/create_campaign');
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setInputValue(value); // Update inputValue if needed
  };

  return (
    <div className="outer">
      <div id="outer-div">
        <div className="space">
          <p>1 of 6</p>
          <h1>Tell us who you’re raising funds for</h1>
          <p>This information helps us get to know you and your fundraising needs.</p>
        </div>
      </div>
      <div className="inner">
        <header className="header1"></header>

        <div className="space1">
          <h2>Who are you fundraising for?</h2>
          <label className={`radio-option ${selectedOption === 'Yourself' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="fundraisingFor"
              value="Yourself"
              checked={selectedOption === 'Yourself'}
              onChange={() => handleOptionChange('Yourself')}
            />
            <div>
              <h3>Yourself</h3>
              <p>Funds are delivered to your bank account for your own use</p>
            </div>
          </label>
          <label className={`radio-option ${selectedOption === 'Someone else' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="fundraisingFor"
              value="Someone else"
              checked={selectedOption === 'Someone else'}
              onChange={() => handleOptionChange('Someone else')}
            />
            <div>
              <h3>Someone else</h3>
              <p>You'll invite a beneficiary to receive funds or distribute them yourself</p>
            </div>
          </label>
          <label className={`radio-option ${selectedOption === 'Charity' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="fundraisingFor"
              value="Charity"
              checked={selectedOption === 'Charity'}
              onChange={() => handleOptionChange('Charity')}
            />
            <div>
              <h3>Charity</h3>
              <p>Funds are delivered to your choosen not profit for you</p>
            </div>
          </label>

          <footer>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleContinue} disabled={!inputValue}>Continue</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Step1;
