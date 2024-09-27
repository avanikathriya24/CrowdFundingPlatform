// src/components/CreateCampaign/Step1.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormContext } from '../../context/FormContext';
import './CreateCampaign.css';

const Step2 = () => {
  const { formData, setFormData } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setInputValue(location.state.step2 || formData.step2 || '');
    }
  }, [location.state, formData.step4]);

  const handleContinue = () => {
    setFormData({ ...formData, step2: inputValue, selectedOption });
    navigate('/step3');
  };

  const handleBack = () => {
    navigate('/step1');
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setInputValue(value); // Update inputValue if needed
  };

  return (
    <div className="outer">
      <div id="outer-div">
        <div className="space">
          <p>2 of 6</p>
          <h1>Set your starting goal</h1>
          <p>You can always change your goal as you go.</p>
        </div>
      </div>
      <div className="inner">
        <header className="header1"></header>

        <div className="space1">
          <input 
            type="Number" 
            min="0"
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Your starting goal" 
          />          
          <footer>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleContinue} disabled={!inputValue}>Continue</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Step2;
