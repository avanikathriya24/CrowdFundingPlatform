import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './sign_in_sign_up.css'; // Make sure this path is correct based on your project structure
import axios from "axios"

function SignIn() {
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...user, [name]: value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/sign_in/", user);
      const data = res.data;

      if (data.success) {
        const userId = data.user_id;
        const userRole = data.role; // Get role from the response

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        document.cookie = `userId=${userId}; expires=${expiryDate.toUTCString()}; path=/; secure; SameSite=Lax`;

        // Redirect based on user role
        if (userRole === "admin") {
          navigate("/works");
        } else {
          navigate("/charity");
        }
      } else {
        setFormErrors(data);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  
  return (

    <div className="outer">
      <div id="outer-div">
        <div className="space">
          <h4>Great Process</h4>
          <h1>Sign in to save and continue</h1>
        </div>
      </div>
      <div className="inner">
        <header className="header1">
          <p>Do not have an account? <a href="/sign_up">Sign up</a></p>
        </header>
        <div className="space1">
        <form>
            <h3>Your account details</h3>
            {/* <input type="email" placeholder="Email Address" id="username" /> */}
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
            <p className="error">{formErrors.notMatch}</p>
            <br />
            <a href="#">Forgot your password?</a>
            <footer>
              <p>By clicking the Sign In button below, you agree to the GoFundMe Terms of Service and acknowledge the Privacy Notice.</p>
              <button type="submit" onClick={loginHandler} >Sign In</button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
