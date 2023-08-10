import React, { useState, useEffect } from 'react';

import { toast } from 'react-hot-toast';



const SlotBooking = ({ place, handleBack, handleBooking }) => {

  

  const [placeKey, setPlaceKey] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [fullName, setFullName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [EmailID, setEmailID] = useState('')
  

  useEffect(() => {

    async function fetchPlaceKey() {
      try {
        const response = await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Admin/Places.json');
        const data = await response.json();
        const matchingPlace = Object.entries(data).find(([key, value]) => value.name === place.name);
        if (matchingPlace) {
          setPlaceKey(matchingPlace[0]); 
        }
      } catch (error) {
        console.error('Error fetching place key:', error);
      }
    }

    fetchPlaceKey();
  }, [place.name]);


  const handleSlotClick = (slotNumber) => {
    if (!isSlotBooked(slotNumber)) {
      setSelectedSlot(slotNumber);
    }
  };

  const handleBookSlot = async () => {
    try {
      const response = await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/BookingRequests.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeName: place.name,
          slotNumber: selectedSlot,
          userName: fullName,
          Email: EmailID,
          vehicleNumber: vehicleNumber,
          vehicleType: vehicleType,
          fromTime: fromTime,
          toTime: toTime,
          status: 'pending', 
        }),
      });

      if (response.ok) {
        toast.success('Booking requested. Waiting for admin approval.');
        setFullName('');
        setVehicleNumber('');
        setVehicleType('');
        setFromTime('');
        setToTime('');
        setSelectedSlot(null);

        const updatedSlotCount = place.slotsAvailable - 1;
        place.slotsAvailable = updatedSlotCount;

        try {
          const result = await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Admin/Places.json');
          const data = await result.json();
          const allplacesID=Object.keys(data);
          console.log(allplacesID)

        } catch (error) {
          console.error('Error fetching places:', error);
        }

        await fetch(`https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Admin/Places/${placeKey}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slotsAvailable: updatedSlotCount,
        }),
      });

      } else {
        toast.error('Error requesting booking.');
      }
    } catch (error) {
      toast.error('Error requesting booking.');
    }
  };

  const isSlotBooked = (slotNumber) => {
    return bookedSlots.includes(slotNumber);
  };

  useEffect(() => {
    fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/BookedSlots.json')
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const slots = Object.keys(data).map((key) => parseInt(key));
          setBookedSlots(slots);
        }
      })
      .catch((error) => {
        console.error('Error fetching booked slots:', error);
      });
  }, []);
  return (
    <div className='slotBookingPage'>
      
      <button className='back-btn' onClick={handleBack}>Back</button>
      <div className='slot-btns-container'>
        {Array.from({ length: place.slotsAvailable }).map((_, index) => {
          const slotNumber = index + 1;
          if (!isSlotBooked(slotNumber)) {
            return (

              <button
                key={slotNumber}
                onClick={() => handleSlotClick(slotNumber)}
                className='slot-btns'
                disabled={isSlotBooked(slotNumber)}
              >
                Slot {slotNumber}
              </button>

            );
          } else {
            return null;
          }
        })}
      </div>
      {selectedSlot !== null && (
        <div className='book-slot-from'>
          <h3>Book Slot {selectedSlot}</h3>
          <div>
            <label>

              <input placeholder='Full Name'
                className='book-slot-input'
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>

              <input placeholder='Email ID'
              className='book-slot-input'
                type="email"
                value={EmailID}
                onChange={(e) => setEmailID(e.target.value)}
              />
            </label>
          </div>


          <div>
            <label>
              <input placeholder='vehicle number'
              className='book-slot-input'
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              <select className='book-slot-input' value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                <option value="">Select Vehicle Type</option>
                <option value="2 wheeler">2 wheeler</option>
                <option value="4 wheeler">4 wheeler</option>
              </select>
            </label>
          </div>
          <div className='form-to-input'>
            <label>
              <span>Form</span>
              <input className='book-slot-input form-input'  type="datetime-local" value={fromTime} onChange={(e) => setFromTime(e.target.value)} />
            </label>
          
            <label>
            <span>To</span>
              <input className='book-slot-input to-input'  placeholder=''To type="datetime-local" value={toTime} onChange={(e) => setToTime(e.target.value)} />
            </label>
          </div>
          <button className='book-slot-btn' onClick={handleBookSlot}>Request Booking</button>
        </div>
      )}
    </div>
  );
};

export default SlotBooking;
