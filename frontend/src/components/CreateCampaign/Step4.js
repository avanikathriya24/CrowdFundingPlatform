// src/components/CreateCampaign/Step4.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormContext } from '../../context/FormContext';
import './CreateCampaign.css';

const Step4 = () => {
  const { formData, setFormData } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setInputValue(location.state.step4 || formData.step4 || '');
    }
  }, [location.state, formData.step4]);

  const handleContinue = () => {
    setFormData({ ...formData, step4: inputValue, selectedOption });
    navigate('/step5');
  };

  const handleBack = () => {
    navigate('/step3');
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setInputValue(value); // Update inputValue if needed
  };

  // Function to count words in the inputValue
  const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };

  // Check if inputValue contains at least 50 words
  const isContinueButtonEnabled = countWords(inputValue) >= 25;

  return (
    <div className="outer">
      <div id="outer-div">
        <div className="space">
          <p>4 of 6</p>
          <h1>Tell donors your story</h1>
        </div>
      </div>
      <div className="inner">
        <header className="header1"></header>

        <div className="space1">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Introduce yourself and what you're raising for(minimum 25 words)..."
            rows="20" // Adjust as needed
            cols="60" // Adjust as needed
          />

          <footer>
            <button onClick={handleBack}>Back</button>
            <button 
              onClick={handleContinue} 
              disabled={!isContinueButtonEnabled}
            >
              Continue
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Step4;
