import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Spinner from '../../components/Spinner';

const AllBookingRequests = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/BookingRequests.json')
      .then((response) => response.json())
      .then((data) => {
        const requestsWithKeys = Object.keys(data).map((key) => ({
          bookingId: key,
          ...data[key],
        }));

        const pendingRequests = requestsWithKeys.filter((request) => request.status === 'pending');
        setBookingRequests(pendingRequests);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching booking requests:', error);
      });
  }, []);

  useEffect(() => {
    if (searchDate) {
      const filtered = bookingRequests.filter((request) => request.fromTime.includes(searchDate));
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests(bookingRequests);
    }
  }, [searchDate, bookingRequests]);

  const handleAcceptBooking = async (bookingId) => {
    try {
      const response = await fetch(`https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/BookingRequests/${bookingId}.json`);
      console.log(response);
      const bookingRequestData = await response.json();

      bookingRequestData.status = 'accepted';

      const acceptedBookingResponse = await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Bookings.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingRequestData),
      });

      if (acceptedBookingResponse.ok) {
        const deleteResponse = await fetch(`https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/BookingRequests/${bookingId}.json`, {
          method: 'DELETE',
        });

        if (deleteResponse.ok) {
          toast.success('Booking accepted');
          const updatedRequests = bookingRequests.filter((request) => request.bookingId !== bookingId);
          setBookingRequests(updatedRequests);
        } else {
          toast.error('Error accepting booking');
        }
      } else {
        toast.error('Error accepting booking');
      }
    } catch (error) {
      toast.error('Error accepting booking');
    }
  };

  return (
    <div className="admin-booking-requests">
      <div className="search-bar">
        <label>Search Request By Date  ::</label>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          placeholder="Search by date"
        />
      </div>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Slot</th>
            <th>User</th>
            <th>Email</th>
            <th>Vehicle Type</th>
            <th>From</th>
            <th>To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Spinner />
          ) : (
            <>
              {filteredRequests.map((request) => (
                <tr className="booking-row" key={request.bookingId}>
                  <td>{request.placeName}</td>
                  <td>{request.slotNumber}</td>
                  <td>{request.userName}</td>
                  <td>{request.Email}</td>
                  <td>{request.vehicleType}</td>
                  <td>{request.fromTime}</td>
                  <td>{request.toTime}</td>
                  <td>
                    <button onClick={() => handleAcceptBooking(request.bookingId)}>Accept</button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookingRequests;
