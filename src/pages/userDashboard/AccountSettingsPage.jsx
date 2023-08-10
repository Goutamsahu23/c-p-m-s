import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';


const AccountSettingsPage = () => {
  const [userData, setUserData] = useState([]);
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    if (userId) {

      fetch(`https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/users/${userId}.json`)
        .then((response) => response.json())

        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/users/${userId}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(() => {
        alert('Account settings updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <div className='accountSettingPage'>
      <h2>Update your Account Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          
          <input
          placeholder='First Name'
            type="text"
            name="FirstName"
            value={userData.FirstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          
          <input
          placeholder='Last Name'
            type="text"
            name="LastName"
            value={userData.LastName}
            onChange={handleChange}
            required
          />
        </label><br/>
        <label>
          
          <input
          placeholder='Email ID'
            type="email"
            name='Email_ID'
            value={userData.Email_ID}
            onChange={handleChange}
            required
          />
        </label><br/>
        <label>
          
          <input
          placeholder='Password'
            type="password"
            name="Password"
            value={userData.Password}
            onChange={handleChange}
            required
          />
        </label><br/>
        <button className='update_btn' type="submit">Update Account</button>
      </form>
    </div>
  );
};

export default AccountSettingsPage;
