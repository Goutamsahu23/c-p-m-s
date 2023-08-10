import React, { useState } from 'react'
import Spinner from '../../components/Spinner'
import Cards from '../../components/Cards'
import SlotBooking from '../../components/SlotBooking'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ReservedParkingPage = () => {
  const[loading,setLoaing]=useState(false)


  async function fetchAllPlaces() {
    try {
      setLoaing(true)
      const result = await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Admin/Places.json');
      const data = await result.json();
      const allPlacesArray = Object.values(data);
      setParkingPlaces(allPlacesArray)
      setLoaing(false)
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }

  useEffect(() => {
    fetchAllPlaces();
  }, []);


  const [parkingPlaces,setParkingPlaces]=useState([])
  const navigate=useNavigate();
  const [selectedPlace,setSelectedPlace]=useState("")
  const [bookingData,setBookingData]=useState("")
  
  const handleParking = (place) => {
    setSelectedPlace(place);

    navigate(`/UserDashboard/ReservedParkingPage/slotBooking`, { state: { place, placeKey: place.id } });
  };
  

  const handleBooking=(data)=>{
    setBookingData([...bookingData,data]);
  }
  function handleBack(){
    setSelectedPlace("");
    navigate('/UserDashboard/ReservedParkingPage')
  }
  return (
    <div className='parking_reservation'>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {selectedPlace ? (
            <SlotBooking place={selectedPlace} handleBack={handleBack} handleBooking={handleBooking} />
          ) : (
            <div>
              <Cards parkingPlaces={parkingPlaces} handleParking={handleParking} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ReservedParkingPage
