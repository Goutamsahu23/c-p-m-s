import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Testimonial.css';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    async function fetchFeedbackData() {
      try {
        const response = await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Admin/Feedbacks.json');
        const data = await response.json();

        const feedbackReviews = Object.entries(data).map(([id, feedback]) => ({
          id,
          name: feedback.name,
          review: feedback.message,
        }));

        setReviews(feedbackReviews);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    }

    fetchFeedbackData();
  }, []);
console.log(reviews)
console.log(reviews.review)
  return (
    <div className="testimonials">
      <h1>Happy Users!!</h1>
      {reviews.length > 0 ? (
        <>
          <div className="testimonial-card">
            <h3>{reviews[currentIndex].name}</h3>
            <p>{reviews[currentIndex].review}</p>
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePrevious}><FiChevronLeft /></button>
            <button onClick={handleNext}><FiChevronRight /></button>
          </div>
        </>
      ) : (
        <p>No feedback available</p>
      )}
    </div>
  );
};

export default Testimonials;
