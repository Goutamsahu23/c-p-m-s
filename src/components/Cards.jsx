import React from 'react'
import Card from './Card'
import './Cards.css'

const Cards = ({parkingPlaces,handleParking}) => {

  return (
    <div className='allCards'>
        {
            parkingPlaces.map( (place) =>{

                return <Card key={place.id} place={place} handleParking={handleParking}/>
            })
        }
    
    </div>
  )
}

export default Cards
