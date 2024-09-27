// src/App.js
import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import SignIn from './components/sign_in_sign_up/sign_in';
import SignUp from './components/sign_in_sign_up/sign_up';
import Footer from './components/Footer/Footer';
import Works from './components/Works/Works';
import Charity from './components/Charity/Charity';
import CreateCampaign from './components/CreateCampaign/CreateCampaign';
import Step1 from './components/CreateCampaign/Step1';
import Step2 from './components/CreateCampaign/Step2';
import Step3 from './components/CreateCampaign/Step3';
import Step4 from './components/CreateCampaign/Step4';
import Step5 from './components/CreateCampaign/Step5';
import Step6 from './components/CreateCampaign/Step6';
import Dashboard from './components/Dashboard/Dashboard';
import Search from './components/Search/Search';
import AllCategories from './components/AllCategories/AllCategories';
import CampaignInfo from './components/CampaignInfo/CampaignInfo'; // Import your CampaignInfo component
import ContactUs from './components/ContactUs/ContactUs';
import Donate from './components/Donate/Donate';
import EditCampaign from './components/Dashboard/EditCampaign';




function App() {
  const location = useLocation();
  
  // Paths where NavBar and Footer should not be shown
  const hideNavBarFooterPaths = [
    '/sign_in',
    '/sign_up',
    '/create_campaign',
    '/step1',
    '/step2',
    '/step3',
    '/step4',
    '/step5',
    '/step6'
  ];
  
  const hideNavBarFooter = hideNavBarFooterPaths.includes(location.pathname);

  return (
    <div className="App">
      {!hideNavBarFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/works" element={<Works />} />
        <Route path="/charity" element={<Charity />} />
        <Route path="/create_campaign" element={<CreateCampaign />} />
        <Route path="/campaign/:campaignId" element={<CampaignInfo />} /> {/* Add this route */}
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/step4" element={<Step4 />} />
        <Route path="/step5" element={<Step5 />} />
        <Route path="/step6" element={<Step6 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path='/all_categories' element={<AllCategories/>}/>
        <Route path='/contact_us' element={<ContactUs/>}/>
        <Route path="/donate" element={<Donate />} />
        <Route path="/edit_campaign/:campaignId" element={<EditCampaign />} />




      </Routes>
      {!hideNavBarFooter && <Footer />}
    </div>
  );
}

export default App;
