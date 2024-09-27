import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Campaign.css';
import './../Home.css'; 

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_all_campaigns/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setCampaigns(data.campaigns);
          console.log("Fetched campaign data:", data);
        } else {
          console.error('Failed to fetch campaigns:', data.error);
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);
  
  const handleCampaignClick = (campaignId) => {
    console.log("Navigating to campaign:", campaignId); // Log the campaign ID
    navigate(`/campaign/${campaignId}`); // Correctly pass the ID
  };

  return (
    <section className="campaign1">
      <h3>Discover fundraisers inspired by what you care about</h3>
      <div className="pro-container">
        {loading ? (
          <p>Loading campaigns...</p>
        ) : campaigns.length > 0 ? (
          campaigns.map(campaign => {
            const { campaign_id, cover_media, title, raised, goal } = campaign;
            return (
              <div className="pro" key={campaign_id} onClick={() => handleCampaignClick(campaign_id)}>
                <img src={cover_media} alt={title} />
                <div className="des" style={{ margin: '0 0 0 20px' }}>
                  <h5>{title}</h5>
                  <div className="progress" style={{ marginTop: '20px', marginBottom: '10px' }}>
                    <div className="skill box1" style={{ width: `${(goal > 0 ? (raised / goal) * 100 : 0)}%` }}></div>
                  </div>
                  <h6 style={{ textAlign: 'left' }}>
                   ₹{raised} raised raised of {goal} goal
                  </h6>
                </div>
              </div>
            );
          })
        ) : (
          <p>No campaigns available.</p>
        )}
      </div>
    </section>
  );
};

export default Campaign;
