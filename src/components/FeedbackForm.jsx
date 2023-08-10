import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import './FeedbackForm.css'

const FeedbackForm = () => {
  const [feedbackFormData, setFeedbackFormData] = useState({
    name: '',
    message: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeedbackFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Admin/Feedbacks.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: feedbackFormData.name,
          message: feedbackFormData.message,
        }),
      });

      if (response.ok) {
        toast.success('Message sent successfully');
        setFeedbackFormData({
          name: '',
          message: '',
        });
      } else {
        toast.error('Error sending message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error sending message');
    }
  };

  return (
    <div className="feedback-form">
      <h2>Send Us Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={feedbackFormData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Feedback:</label>
          <textarea
            id="message"
            name="message"
            value={feedbackFormData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
