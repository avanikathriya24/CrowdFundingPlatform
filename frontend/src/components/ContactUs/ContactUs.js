import React, { useState } from 'react';
// import './ContactUs.css'; // Assuming you have a CSS file for styles
import '../sign_in_sign_up/sign_in_sign_up.css'

const ContactUs = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8000/contact_us/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setFullName('');
        setEmail('');
        setMessage('');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to send message');
    }
  };

  return (
    <div id = 'contact' className="outer">


      <div id="outer-div">
        <div className="space">
          <h4>Welcome to CrowdFund</h4>
          <h1>Create an account</h1>
        </div>
      </div>

<div className="inner">
        <header className='header1'>
        </header>
        <div className="space1">
          <form onSubmit={handleSubmit}>
            <h3>Contact Us</h3>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder='Full Name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <br/>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            
              <textarea
                id="message"
                name="message"
                rows="4"
                value={message}
                className='textarea1'
                placeholder='message'
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>

            <footer>
              <button type="submit">Send Message</button>

            </footer>
          </form>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
      </div>
      
    </div>
  );
};

export default ContactUs;
