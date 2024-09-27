import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import './CampaignInfo.css';

const CampaignInfo = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`http://localhost:8000/get_campaign/${campaignId}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();

        if (response.ok) {
          console.log('Fetched campaign:', data.campaign); // Log the fetched campaign

          setCampaign(data.campaign);
        } else {
          console.error('Failed to fetch campaign:', data.error);
        }
      } catch (error) {
        console.error('Error fetching campaign:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const isLoggedIn = () => {
    const cookies = document.cookie.split(';');
    const userIdCookie = cookies.find(cookie => cookie.trim().startsWith('userId='));
    return userIdCookie ? true : false;
  };
  
  const handleDonateClick = () => {
    if (!isLoggedIn()) {
      alert("Please sign in to Donate.");
      navigate('/sign_in');
    } else {
      navigate('/donate', { state: { campaign } }); // Pass campaign data to the donation page
    }
  };

  if (loading) return <p>Loading campaign...</p>;
  if (!campaign) return <p>Campaign not found.</p>;

  return (
    <div className="container">
      <div className="content">
        <div className="header">
          <h1>{campaign.title}</h1>
        </div>
        <div className="main-content">
          <div className="image-section">
            <img src={campaign.cover_media} alt={campaign.title} />
          </div>
          <div className="details-section">
            <h2>{campaign.raised} <small>raised of {campaign.goal} goal</small></h2>
            <p>{campaign.story}</p>
            <p><strong>Location:</strong> {campaign.location}</p>
            <p><strong>Category:</strong> {campaign.category}</p>
            <p><strong>Created:</strong> {campaign.created_date}</p>
            <button className="donate-button" onClick={handleDonateClick}>Donate now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfo;
