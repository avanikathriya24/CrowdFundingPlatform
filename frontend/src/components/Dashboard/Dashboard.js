import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const cookies = document.cookie.split(';');
      const userIdCookie = cookies.find(cookie => cookie.trim().startsWith('userId='));
      const userId = userIdCookie ? userIdCookie.split('=')[1] : null;

      if (!userId) {
        alert('Please sign in to view your campaigns.');
        navigate('/sign_in');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8000/get_user_campaigns/', { userId });
        setCampaigns(response.data.campaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        alert('Failed to fetch campaigns. Please try again.');
      }
    };

    fetchCampaigns();
  }, [navigate]);

  const handleCampaignClick = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  const handleEditClick = (campaignId) => {
    navigate(`/edit_campaign/${campaignId}`); // Navigate to the edit page
  };

  const handleClick = () => {
    navigate('/create_campaign');
  };

  return (
    <div className="container">
      <header>
        <h1>Your Fundraiser</h1>
        <button onClick={handleClick} className="green">Start CrowdFund</button>
      </header>
      <div className="campaigns">
        {campaigns.length === 0 ? (
          <p>No campaigns found.</p>
        ) : (
          campaigns.map(campaign => (
            <div key={campaign.campaign_id} className="campaign" onClick={() => handleCampaignClick(campaign.campaign_id)}>
              {campaign.cover_media && (
                <img src={campaign.cover_media} alt="Cover" />
              )}
              <div className="campaign-content">
                <h3>{campaign.title}</h3>
                <p><strong>Goal:</strong> {campaign.goal}</p>
                <p><strong>Category:</strong> {campaign.category}</p>
                <p><strong>Location:</strong> {campaign.location}</p>
                <p><strong>Story: </strong> {campaign.story}</p>
                <p><strong>Date: </strong> {campaign.created_date}</p>
                <button className="edit-button" onClick={(e) => { e.stopPropagation(); handleEditClick(campaign.campaign_id); }}>
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
