import React from 'react'
import { NavLink, Outlet, Route, Routes, useNavigate } from 'react-router-dom'

import ProfilePage from './ProfilePage'
import logo from '../../assets/logo.svg'
import ReservationHistoryPage from './ReservationHistoryPage'
import ReservedParkingPage from './ReservedParkingPage'
import AccountSettingsPage from './AccountSettingsPage'

import { toast } from 'react-hot-toast'

const UserDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
   
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
          navigate('/');
        }, 1000); 
      }),
      {
        loading: 'Logging out...',
        success: 'Logged out successfully!',
        error: 'Error logging out.',
      }
    );
  };
  return (
    <div >
      <div className='Dashboard_Header'><img src={logo} alt='logo' width={100} height={100}/></div>
      <div className='user_Dashboard_Nav'>
      <ul>
        <li>
          <NavLink to='Profile'>My Profile</NavLink>
        </li>


        <li>
          <NavLink to='ReservedParkingPage'>Reserv Parking</NavLink>
        </li>

        <li>
          <NavLink to='ReservationHistoryPage'>Parking History</NavLink>
        </li>


        <li>
          <NavLink to='AccountSettingsPage'>Account Settings</NavLink>
        </li>

        <li>
          <NavLink onClick={handleLogout}>Log out</NavLink>
        </li>
      </ul>
      </div> 
      
      <div><Outlet /></div>

      <div>
        <Routes>
          <Route path='Profile' element={<ProfilePage />}/>
          <Route path='ReservedParkingPage/*' element={<ReservedParkingPage />} />
          <Route path='ReservationHistoryPage/*' element={<ReservationHistoryPage />} />
          <Route path='AccountSettingsPage/*' element={<AccountSettingsPage />} />
          <Route path='/' element={()=>navigate('/')} />
          

        </Routes>
      </div>
    </div>
  )
}

export default UserDashboard

