import React from 'react'
import './Card.css'
import { NavLink } from 'react-router-dom'

const Card = ({place,handleParking}) => {

  function clickHandler(){
    handleParking(place)
  }

  return (
    <div>
      <div className='Card'>
        <h3 className='Card_Text'>{place.name}</h3>
        <h3 className='Card_Text'>{place.details}</h3>
        <h4 className='Card_Text'>Available Slots::{place.slotsAvailable}</h4>
        <NavLink to='slotBooking'onClick={clickHandler} className='Card_btn'>Book your Parking</NavLink>
      </div>
    </div>
  )
}

export default Card
