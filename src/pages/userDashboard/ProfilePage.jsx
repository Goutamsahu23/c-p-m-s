import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import ReservationHistoryPage from './ReservationHistoryPage';
import Spinner from '../../components/Spinner';

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;
  const userId = user ? user.uid : null; 

  useEffect(() => {
    setLoading(true);
    if (userId) {
      
      fetch(`https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/users/${userId}.json`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setUserData(data);
          } else {
            console.log("No data available");
          }
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  }, [userId]);

  return (
    <div className='profilePage'>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Hello {userData.FirstName} {userData.LastName}</h1>
          <h2>{userData.Email_ID}</h2>
          <div><Link to={`/UserDashboard/AccountSettingsPage`}>Edit Account Settings</Link></div>
          <p><ReservationHistoryPage userEmail={userData.Email_ID} /></p>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
