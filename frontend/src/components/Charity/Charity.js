// CharityPage.js
import React from 'react';
import './Charity.css'; 
import { useNavigate } from 'react-router-dom';
import '../Home/Campaign/Campaign.css'
import { FaGift,FaBolt,FaShieldAlt, FaFileAlt, FaLock, FaMobile, FaChartBar, FaGithub } from 'react-icons/fa'; // Importing the Font Awesome Search Icon

const Charity = () => {

    const navigate = useNavigate();

    const features = [
        { icon: FaShieldAlt, title: "Donor protection guarantee", text: "GoFundMe has the first and only donor guarantee in the industry." },
        { icon: FaFileAlt, title: "Simple setup", text: "You can personalise and share your GoFundMe in just a few minutes." },
        { icon: FaLock, title: "Secure", text: "Our Trust & Safety team works around the clock to protect you against fraud." },
        { icon: FaMobile, title: "Mobile app", text: "The GoFundMe app makes it simple to launch and manage your fundraiser on the go." },
        { icon: FaChartBar, title: "Social reach", text: "Harness the power of social media to spread your story and get more support." },
        { icon: FaGithub, title: "Expert advice", text: "Our best-in-class customer care specialists will answer your questions, day or night." } // Updated FaIdeal to FaGithub for demonstration
    ];

    const handleClick = () => {
        navigate('/create_campaign');
      };

    return (
        <div>
            {/* Slider Section */}
            <section>
                <div className="section-p">
                <button onClick={handleClick} >Get Started</button>

                    <p className="main-heading">Make a difference with charity fundraising</p>
                    <p className="sub-heading">The quick and easy way to raise money for the charities you care about.</p>
                    <h5 className="start-heading">START A GOFUNDME FOR A CHARITY</h5>
                    {/* <div className="search-box">
                        <input className="search" type="search" placeholder="Find charities by name or charity numbers...." />
                    </div> */}
                    <div className="slider">
                        <div className="slide-track">
                            {[
                                "img/slide/Alzheimers-Society.png",
                                "img/slide/British-Heart-Society.png",
                                "img/slide/unicef.webp",
                                "img/slide/Cancer-Research-UK.png",
                                "img/slide/KRUK.jpg",
                                "img/slide/Little-Princess-Trust.jpg",
                                "img/slide/mind_logo.png",
                                "img/slide/ms-logo.png",
                                "img/slide/Macmillan-Cancer-Support.jpeg",
                                "img/slide/woundedwarrior-2.webp",

                            ].map((charity, index) => (
                                <div className="slide" key={index}>
                                    <a href="#">
                                        <img src={charity} alt={charity} />
                                    </a>
                                </div>
                                                               
                            ))
                            }

                            
                        </div>
                        
                    </div>
                    
                </div>
            </section>

            {/* Mobile and Info Section */}
            <section>
                <div className="charity">
                    <div className="child1">
                        <img src="img/img.png" alt="How to fundraise" />
                    </div>
                    <div>
                        <p className="info-heading">How to fundraise for a charity on GoFundMe</p>
                        {[
                            { number: 1, heading: "Choose a charity", text: "Select from our list of registered charities." },
                            { number: 2, heading: "Launch your fundraiser", text: "Share your fundraiser easily with family and friends to raise donations." },
                            { number: 3, heading: "Make a difference", text: "Funds are delivered automatically and 100% of Gift Aid goes directly to charity." }
                        ].map(({ number, heading, text }) => (
                            <div className="child2" key={number}>
                                <div className="green-circle">
                                    <span className="absolute-center">{number}</span>
                                </div>
                                <div>
                                    <h3 className="heading-3">{heading}</h3>
                                    <p className="medium-gray">{text}</p>
                                </div>
                            </div>
                        ))}
                        <div>
                            <a href="start.html">
                                <button onClick={handleClick} className="green">Start CrowdFund</button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Campaign Details Section */}
            <section className="campaign1">
                <h3>Trending Charity Fundraise</h3>
                <div className="pro-container">
                    {[
                        { title: "Fund go to gaza", image: "img/campaign/6.jpg", amount: "$89000" },
                        { title: "For child education", image: "img/campaign/5.jpg", amount: "₹780000" },
                        { title: "Nonprofit Help", image: "img/campaign/7.jpg", amount: "$40000" }
                    ].map(({ title, image, amount }) => (
                        <div className="pro" key={title}>
                            <img src={image} alt={title} />
                            <div className="des">
                                <h5>{title}</h5>
                                <div className="progress">
                                    <div className="skill box1"></div>
                                </div>
                                <h6 style={{ textAlign: 'left' }}>{amount} raised</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Rally Section */}
            <section style={{ background: '#F5F0EE', padding: '80px 50px 30px 250px' }}>
                <p className="rally-heading">Rally your family & friends! - we'll do the rest</p>
                <div className="charity">
                    <div>
                        <FaGift />
                        <p className="info-text">100% of Gift Aid goes to charity</p>
                    </div>
                    <div>
                        <FaBolt />
                        <p className="info-text">Automatic donation delivery</p>
                    </div>
                </div>
            </section>

            {/* Ad Section */}
            <section id="ad" style={{ padding: '20px 100px 10px 100px' }}>
            <p className="ad-heading">The leader in online fundraising</p>
            <div className="pro-container">
                {features.map(({ icon: Icon, title, text }) => (
                    <div className="child3" key={title}>
                        <div className="green-circle">
                            <span className="absolute-center">
                                <Icon size={24} /> {/* Ensure the icon component is capitalized */}
                            </span>
                        </div>
                        <div style={{ paddingLeft: '40px' }}>
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

            
        </div>
    );
};

export default Charity;
