import React from 'react'
import { NavLink, Route, Routes, useNavigate, } from 'react-router-dom';
import Users from './Users'
import logo from '../../assets/logo.svg'
import AddPlacesPage from './AddPlacesPage';
import AllBookings from './AllBookings';
import { toast } from 'react-hot-toast';
import AllBookingRequests from './AllBookingRequests';


const AdminDasboard = () => {
    const navigate=useNavigate();


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
    <div>
      <div className='Dashboard_Header'><img src={logo} alt='logo' width={100} height={100}/></div>
      <div className='user_Dashboard_Nav'>
        <ul>
          <li><NavLink to='users' >Users</NavLink></li>
          <li><NavLink to='addPlaces' >Add Places</NavLink></li>
          <li><NavLink to='AllBookingRequests'>Booking Requests</NavLink></li>
          <li><NavLink to='bookings'>Bookings</NavLink></li>
          <li><NavLink onClick={handleLogout}>Log out</NavLink></li>
        </ul>
      </div>
      

      <Routes>
      <Route path='users' element={<Users/>} />
        <Route path='addPlaces' element={<AddPlacesPage/>} />
        <Route path='AllBookingRequests' element={<AllBookingRequests/>}/>
        <Route path='bookings' element={<AllBookings/>} />
        <Route path='/' element={()=>navigate('/')} />
      </Routes>
    </div>
  )
}

export default AdminDasboard
