import React, { useState, useEffect } from 'react';

const AllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);

  async function fetchAllBookings() {
    try {
      const result = await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Bookings.json');
      const data = await result.json();
      const allPlacesArray = Object.values(data);
      setAllBookings(allPlacesArray);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }

  async function clearAllBookings() {
    try {
      const response = await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Bookings.json', {
        method: 'DELETE',
      });

      if (response.ok) {
        setAllBookings([]);
      } else {
        console.error('Error clearing bookings:', response.statusText);
      }
    } catch (error) {
      console.error('Error clearing bookings:', error);
    }
  }

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div className="booking-list">
      <button onClick={clearAllBookings} className="clear-button">Clear All</button>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>User's Name</th>
            <th>Email</th>
            <th>Place of Parking</th>
            <th>Slot Number</th>
            <th>Vehicle Number</th>
            <th>Vehicle Type</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {allBookings.map((book, index) => (
            <tr className="booking-row" key={index}>
              <td>{index + 1}</td>
              <td>{book.userName}</td>
              <td>{book.Email}</td>
              <td>{book.placeName}</td>
              <td>{book.slotNumber}</td>
              <td>{book.vehicleNumber}</td>
              <td>{book.vehicleType}</td>
              <td>{book.fromTime}</td>
              <td>{book.toTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookings;
