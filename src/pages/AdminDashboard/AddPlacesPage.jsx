import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Spinner from '../../components/Spinner'
const AddPlacesPage = () => {
  const [placeName, setPlaceName] = useState('');
  const [placeDetails, setPlaceDetails] = useState('');
  const [slotsAvailable, setSlotsAvailable] = useState(0); 
  const [showAllPlace, setShowAllPlaces] = useState([]);
  const [loading, setLoading] = useState(false)


  const handleAddPlace = async () => {
    try {
      const response = await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Admin/Places.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: placeName,
          details: placeDetails,
          slotsAvailable: slotsAvailable, 
        }),
      });

      if (response.ok) {
        toast.success('Place added Successfully');
        setPlaceName('');
        setPlaceDetails('');
        setSlotsAvailable(0);

        fetchAllPlaces();
      } else {
        alert('Error adding new place.');
      }
    } catch (error) {
      alert('Error adding new place.');
    }
  };

  async function fetchAllPlaces() {
    try {
      setLoading(true);
      const result = await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Admin/Places.json');
      const data = await result.json();
      let allPlacesArray = [];
  
      if (data) {
        allPlacesArray = Object.entries(data).map(([id, place]) => ({ id, ...place }));
      }
  
      setShowAllPlaces(allPlacesArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }
  
  

  useEffect(() => {
    fetchAllPlaces();
  }, []);
  const handleDeletePlace = async (placeId) => {
    try {
      const response = await fetch(`https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/Admin/Places/${placeId}.json`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Place deleted Successfully');
        fetchAllPlaces();
      } else {
        alert('Error deleting place.');
      }
    } catch (error) {
      alert('Error deleting place.');
    }
  };
  return (
    <div className="add-parking-place">
      <h2>Add New Parking Place</h2>
      <div>
        <label>
          Place Name:
          <input
            type="text"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Place Details:
          <textarea
            value={placeDetails}
            onChange={(e) => setPlaceDetails(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Slots Available:
          <input
            type="number"
            value={slotsAvailable}
            onChange={(e) => setSlotsAvailable(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleAddPlace}>Add Place</button>
  
      <div className="all-places">
  <h3>All Places:</h3>
  {loading ? (
    <Spinner />
  ) : showAllPlace === null || showAllPlace.length === 0 ? (
    <p>No places available</p>
  ) : (
    <div className="places-container">
      {showAllPlace.map((place, index) => (
        <div className="place-card" key={index}>
          <h4>{place.name}</h4>
          <p>{place.details}</p>
          <p>Slots Available :{place.slotsAvailable}</p>
          <button onClick={() => handleDeletePlace(place.id)}>Delete</button>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
};

export default AddPlacesPage;
