import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCampaign.css';
const EditCampaign = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [story, setStory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/get_campaign/${campaignId}/`);
        setCampaign(response.data.campaign);
        setTitle(response.data.campaign.title);
        setGoal(response.data.campaign.goal);
        setCategory(response.data.campaign.category);
        setLocation(response.data.campaign.location);
        setStory(response.data.campaign.story);
      } catch (error) {
        console.error('Error fetching campaign:', error);
        alert('Failed to fetch campaign details. Please try again later.');
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/edit_campaign/${campaignId}/`, {
        title,
        goal,
        category,
        location,
        story,
      });
      if (response.status === 200) {
        alert('Campaign updated successfully!');
        navigate(`/campaign/${campaignId}`);
      }
    } catch (error) {
      console.error('Error updating campaign:', error);
      alert('Failed to update campaign. Please check your inputs and try again.');
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      }
    }
  };

  if (!campaign) return <p>Loading...</p>;

  return (
    <div className="edit-container">
      <h1>Edit Campaign</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Campaign Title"
          required
        />
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Campaign Goal"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Campaign Story"
          required
        />
        <button type="submit">Update Campaign</button>
      </form>
    </div>
  );
};

export default EditCampaign;
