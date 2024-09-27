import React, { useState } from 'react';

import './sign_in_sign_up.css'; // Make sure this path is correct based on your project structure
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {

  const [formErrors, setFormErrors] = useState({});

  // Add 'role' to the user state with a default value of 'customer'
  const [user, setUserDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    role: "user", // Default value
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    console.log("Signing up with user details:", user); // Log user details

    try {
      const res = await axios.post("http://localhost:8000/sign_up/", user);
      console.log("Response from signup:", res.data); // Log the response

      const data = res.data;

      if (data.success) {
        const userId = data.user_id;

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        document.cookie = `userId=${userId}; expires=${expiryDate.toUTCString()}; path=/; secure; SameSite=Lax`;

        navigate('/dashboard');
      } else {
        setFormErrors(data);

      }
    } catch (error) {
      console.error('Error signing up:', error);
      setFormErrors({ message: 'An error occurred. Please try again.' });
    }
  };

  return (
    
    <div className="outer">
      <div id="outer-div">
        <div className="space">
          <h4>Welcome to CrowdFund</h4>
          <h1>Create an account</h1>
        </div>
      </div>
      <div className="inner">
        <header className='header1'>
          <p>Already have an account? <a href="/sign_in">Sign In</a></p>
        </header>
        <div className="space1">
          <form>
            <h3>Your account details</h3>
            <input
              type="text"
              name="fname"
              id="fname"
              className='inputname'
              placeholder="First Name"
              onChange={changeHandler}
              value={user.fname}
            />
            <input
              type="text"
              name="lname"
              id="lname"
              className='inputname'
              placeholder="Last Name"
              onChange={changeHandler}
              value={user.lname}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={changeHandler}
              value={user.email}
            />         
            <p className="error">{formErrors.email}</p>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={changeHandler}
              value={user.password}
            />
            <p className="error">{formErrors.password}</p>
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm Password"
              onChange={changeHandler}
              value={user.cpassword}
            />
            <p className="error">{formErrors.cpassword}</p>

            <div className="passwordConstraint">

                <p>Your password must have:</p>
                <ul>
                    <li>At least 12 characters</li>
                    <li>1 uppercase letter</li>
                    <li>1 lowercase letter</li>
                    <li>1 number</li>
                    <li>1 symbol</li>
                </ul>
            </div>
            <footer>
              <p>By clicking the Sign In button below, you agree to the GoFundMe Terms of Service and acknowledge the Privacy Notice.</p>
              <button type="submit" onClick={signupHandler}>Sign Up</button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
