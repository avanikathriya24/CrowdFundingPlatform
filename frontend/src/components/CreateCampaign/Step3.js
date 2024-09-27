// Step3.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormContext } from '../../context/FormContext';
import './CreateCampaign.css';

const Step3 = () => {
  const { formData, setFormData } = useFormContext();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setImage(location.state.step3 || formData.step3 || null);
    }
  }, [location.state, formData.step3]);

  const handleContinue = () => {
    setFormData({
      ...formData,
      step3: image
    });
    navigate('/step4');
  };

  const handleBack = () => {
    navigate('/step2');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 encoded string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 encoded string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="outer">
      <div id="outer-div">
        <div className="space">
          <p>3 of 6</p>
          <h1>Upload Your Image</h1>
          <p>Please upload an image related to your campaign.</p>
        </div>
      </div>
      <div className="inner">
        <header className="header1"></header>

        <div className="space1">
          <div
            className="drag-drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {image ? (
              <img src={image} alt="Uploaded Preview" className="image-preview" />
            ) : (
              <p>Drag & drop an image here or click to select</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload" className="upload-button">Upload Image</label>
          </div>

          <footer>
            <button onClick={handleBack}>Back</button>
            <button
              onClick={handleContinue}
              disabled={!image} // Enable button only if an image is uploaded
            >
              Continue
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Step3;
