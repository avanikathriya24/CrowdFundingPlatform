import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; SameSite=Lax`;
}

const Navbar = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const [navMenuOpen, setNavMenuOpen] = useState(false); // State for responsive menu
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getCookie = (name) => {
      const cookieName = `${name}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookies = decodedCookie.split(';');

      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return null;
    };

    const fetchData = async () => {
      const userId = getCookie('userId');
      if (userId) {
        setLoggedIn(true);
        try {
          const res = await axios.post("http://localhost:8000/get_user_data/", { userId });
          if (res.data.success) {
            setUserName(res.data.first_name); // Set the user's first name
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          alert('Failed to fetch user data. Please try again.');
        }
      }
    };

    fetchData();
  }, [location]);  

  const handleSignOut = () => {
    deleteCookie("userId");
    window.location.reload();
  };

    // Debugging state toggle
    const toggleNavMenu = () => {
      console.log('Toggling menu');
      setNavMenuOpen(prevState => !prevState);
    };


  const handleClick = () => {
    navigate('/create_campaign');
  };
   


  return (
    <section id="header">
      <a href="/"><img src="img/logo.png" className="logo" alt="Logo" /></a>

      <div>
      <ul id ='navbar' className={`nav-links ${navMenuOpen ? 'active' : ''}`}>
      <li className="dropdown1">
            <a href="#">Discover</a>
            <div className="dropdown-content1">
              <a href="/all_categories">Fundraisor For</a>
              {/* <br/>
              <a href="/sucess_stories">Sucess Stories</a> */}
              <br/>
              <a href="/contact_us">Contact Us</a>
              <br/>
              
            </div>
          </li>
          <li><a href="/charity">For Charities</a></li>
          <li><a href="/works">How it works</a></li>
          <li><a href="/search"><FaSearch> </FaSearch> Search</a></li>
      {!loggedIn ? (
        <>
        <li><a href="/sign_in">Sign in</a></li>
        <li>
        <button onClick={handleClick} className="green">                  
         Start CrowdFund
        </button></li>

        </>

      ):(
        <>
        <li>
              <FaUserCircle
                className="profile-icon"
                onClick={() => setMenuOpen(!menuOpen)}
              />
        </li>
        <li> {userName}
              {menuOpen && (
                <div className="profile-menu">
                  <a href="/dashboard">My Profile</a>
                  <a href="/" onClick={handleSignOut}>Sign Out</a>
                </div>
              )}
            </li>
        </>

      )}

          <a href="#" id="close" ><i className="far fa-times"></i></a>
        </ul>
      </div>
      <div id="mobile">
        <i id="bar" className="fas fa-outdent" ></i>
      </div>
    </section>
  );
};

export default Navbar;
