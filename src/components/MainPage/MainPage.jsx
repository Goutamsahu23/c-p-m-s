import React from 'react'

import {NavLink} from 'react-router-dom'

const MainPage = () => {

  
  return (
    <div className='mainpage'>
      
    <h1>Find Your Parkings in Seconds</h1>
    <h4>Unlocking Convenience Through Smart Parking Solutions.</h4>
    <button className='btn' >
    <NavLink  to={`https://en.wikipedia.org/wiki/Car_parking_system`} target='_blank'>About Us</NavLink>
    </button>
      
    </div>
  )
}

export default MainPage
