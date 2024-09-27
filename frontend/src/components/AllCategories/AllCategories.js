import React from 'react';
import './AllCategories.css'; // Make sure to create this CSS file
import { useNavigate } from 'react-router-dom';


const AllCategories = () => {



  return (
    <>
      <SectionHeader />
      <FundraisingCategories />
      <AboutFundraising />
      <Advertisement />
    </>
  );
};



const SectionHeader = () => (
    
    
  <section>
    <div className="section-p">
      <p className="main-title">Start a Fundraiser</p>
      <p className="sub-title">People around the world are raising money for what they are passionate about.</p>
      <a href='/create_campaign'><button  className="green">Start CrowdFund</button></a>
    </div>
  </section>
);

const FundraisingCategories = () => (
  <section id="category">
    <h2>Fundraising Categories</h2>
    <div className="pro-container">
      {categories.map(category => (
        <CategoryCard key={category.name} category={category} />
      ))}
    </div>
    <div className="pro-container1">
      {additionalCategories.map(category => (
        <AdditionalCategoryCard key={category.name} category={category} />
      ))}
    </div>
    <hr />
  </section>
);

const CategoryCard = ({ category }) => (
  <div className="pro">
    <a href="start.html">
      <img src={category.image} alt={category.name} />
      <div className="des">
        <h5>{category.name}</h5>
      </div>
    </a>
  </div>
);

const AdditionalCategoryCard = ({ category }) => (
  <div>
    <a href="start.html">
      <img src={category.image} alt={category.name} />
      <p>{category.name}</p>
    </a>
  </div>
);

const AboutFundraising = () => (
  <section className="about" id="about">
    {aboutSections.map((about, index) => (
      <AboutSection key={index} about={about} />
    ))}
  </section>
);

const AboutSection = ({ about }) => (
  <div className="about-container">
    <div className={about.imageFirst ? 'about-img' : 'about-text'}>
    {about.imageFirst ? 
      <img src={about.image} alt={about.title} />:
      <><h5>{about.subtitle}</h5>
      <h2 style={{ fontSize: '30px' }}>{about.title}</h2>
      <p>{about.description}</p>
      <a href="#">{about.linkText}</a></>
    }
    </div>
    <div className={about.imageFirst ? 'about-text' : 'about-img'}>
    {about.imageFirst ? <>
      <h5>{about.subtitle}</h5>
      <h2 style={{ fontSize: '30px' }}>{about.title}</h2>
      <p>{about.description}</p>
      <a href="#">{about.linkText}</a>
      </>:
      <img src={about.image} alt={about.title} />
}
    </div>
  </div>
);

const Advertisement = () => (
  <section className="advertisement" style={{ background: '#F5F0EE', padding: '20px 100px 10px 100px' }}>
    <p className="ad-title">The leader in online fundraising</p>
    <div className="pro-container">
      {adFeatures.map(feature => (
        <AdFeatureCard key={feature.title} feature={feature} />
      ))}
    </div>
  </section>
);

const AdFeatureCard = ({ feature }) => (
  <div className="child3">
    <div className="green-circle">
      <span className="absolute-center">
        <i className={feature.icon}></i>
      </span>
    </div>
    <div style={{ paddingLeft: '40px' }}>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  </div>
);

// Sample Data
const categories = [
  { name: 'Medical', image: 'img/campaign/8.jpg' },
  { name: 'Funeral', image: 'img/campaign/funeral.jpg' },
  { name: 'Emergency', image: 'img/campaign/em.jpg' },
  { name: 'Charity', image: 'img/campaign/charity.jpg' },
  { name: 'Financial Emergency', image: 'img/campaign/finance.jpg' },
  { name: 'Animals', image: 'img/campaign/animal.jpg' },
];

const additionalCategories = [
  { name: 'Business', image: 'img/category/business.png' },
  { name: 'Community', image: 'img/category/community.png' },
  { name: 'Competition', image: 'img/category/competition.png' },
  { name: 'Creative', image: 'img/category/creative.png' },
  { name: 'Event', image: 'img/category/event.png' },
  { name: 'Faith', image: 'img/category/faith.png' },
  { name: 'Family', image: 'img/category/family.png' },
  { name: 'Sports', image: 'img/category/sports.png' },
  { name: 'Travel', image: 'img/category/travel.png' },
  { name: 'Volunteer', image: 'img/category/volunteer.png' },
];

const aboutSections = [
  {
    title: 'A safer home',
    subtitle: 'MEDICAL FUNDRAISING',
    description: 'To bring home his seriously ill twins from hospital, Stephen raised £59,810 to adapt his house for their needs.',
    linkText: 'Learn more about medical fundraising',
    image: 'img/campaign/med.jpg',
    imageFirst: true,
  },
  {
    title: 'Aiming for the stars',
    subtitle: 'EDUCATION FUNDRAISING',
    description: 'To fulfil her dream of becoming an astronaut, Agnes raised £14,500 to study physics at Manchester University.',
    linkText: 'Learn more about educational fundraising',
    image: 'img/campaign/blog-recent-3.jpg',
    imageFirst: false,
  },
  {
    title: 'Rebuilding together',
    subtitle: 'EMERGENCY FUNDRAISING',
    description: 'After the Grenfell Tower tragedy, Britons came together to raise £127,966 for the victims and their families.',
    linkText: 'Learn more about emergency fundraising',
    image: 'img/campaign/3.jpg',
    imageFirst: true,
  },
];

const adFeatures = [
  {
    title: 'Donor protection guarantee',
    description: 'GoFundMe has the first and only donor guarantee in the industry.',
    icon: 'fa-solid fa-shield-halved',
  },
  {
    title: 'Simple setup',
    description: 'You can personalise and share your GoFundMe in just a few minutes.',
    icon: 'fa-regular fa-file-lines',
  },
  {
    title: 'Secure',
    description: 'Our Trust & Safety team works around the clock to protect you against fraud.',
    icon: 'fa-solid fa-lock',
  },
  {
    title: 'Mobile app',
    description: 'The GoFundMe app makes it simple to launch and manage your fundraiser on the go.',
    icon: 'fa-solid fa-mobile-screen-button',
  },
  {
    title: 'Social reach',
    description: 'Harness the power of social media to spread your story and get more support.',
    icon: 'fa-solid fa-chart-simple',
  },
  {
    title: 'Expert advice',
    description: 'Our best-in-class customer care specialists will answer your questions, day or night.',
    icon: 'fa-brands fa-ideal',
  },
];


export default AllCategories;
