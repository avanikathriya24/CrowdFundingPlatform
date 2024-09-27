// src/components/CreateCampaign/Step4.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormContext } from '../../context/FormContext';
import './CreateCampaign.css';

const Step5 = () => {
  const { formData, setFormData } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setInputValue(location.state.step5 || formData.step5 || '');
    }
  }, [location.state, formData.step5]);

  const handleContinue = () => {
    setFormData({ ...formData, step5: inputValue, selectedOption });
    navigate('/step6');
  };

  const handleBack = () => {
    navigate('/step4');
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setInputValue(value); // Update inputValue if needed
  };
 
  return (
    <div className="outer">
      <div id="outer-div">
        <div className="space">
          <p>5 of 6</p>
          <h1>Give Title to your Campaign</h1>
        </div>
      </div>
      <div className="inner">
        <header className="header1"></header>

        <div className="space1">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Donate to help..."
          />

          <footer>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleContinue} disabled={!inputValue}>Review</button>

          </footer>
        </div>
      </div>
    </div>
  );
};

export default Step5;
