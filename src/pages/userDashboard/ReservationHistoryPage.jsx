import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';

const ReservationHistoryPage = ({ userEmail }) => {
  const [userReservations, setUserReservations] = useState([]);
  const [loaing,setLoading]=useState(false)

  useEffect(() => {
    async function fetchUserReservations() {
      setLoading(true)
      try {
        const response = await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Bookings.json');
        const data = await response.json();


        const userReservations = Object.values(data).filter((reservation) => reservation.Email_ID === userEmail);

        setUserReservations(userReservations);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    }

    fetchUserReservations();
  }, [userEmail]);

  return (
    <div className="reservation-history">
      <table className="reservation-table">
      {loaing ? (<Spinner/>):
      (
        <>
        <thead>
          <tr>
            <th>User's Name</th>
            <th>Place of Parking</th>
            <th>Slot Number</th>
            <th>Email ID</th>
            <th>Vehicle Number</th>
            <th>Vehicle Type</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          
          {userReservations.map((book, index) => (
            <tr key={index}>
              <td>{book.userName}</td>
              <td>{book.placeName}</td>
              <td>{book.slotNumber}</td>
              <td>{book.Email}</td>
              <td>{book.vehicleNumber}</td>
              <td>{book.vehicleType}</td>
              <td>{book.fromTime}</td>
              <td>{book.toTime}</td>
            </tr>
          ))}
        </tbody>
        </>
      )}
        
      </table>
    </div>
  );
};

export default ReservationHistoryPage;
