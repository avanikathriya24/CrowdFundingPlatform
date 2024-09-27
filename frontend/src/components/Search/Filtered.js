// Campaign.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Home/Campaign/Campaign.css';
import '../Home/Home.css'; 

const Filtered = ({ searchQuery }) => {
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

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.category.toLowerCase().includes(searchQuery.toLowerCase())

  );

  const handleCampaignClick = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  return (
    <section className="campaign1">
      <h3>Discover fundraisers inspired by what you care about</h3>
      <div className="pro-container">
        {loading ? (
          <p>Loading campaigns...</p>
        ) : filteredCampaigns.length > 0 ? (
          filteredCampaigns.map(campaign => {
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
                    ${raised} raised of ${goal}
                  </h6>
                </div>
              </div>
            );
          })
        ) : (
          <p>No campaigns available for this category.</p>
        )}
      </div>
    </section>
  );
};

export default Filtered;
