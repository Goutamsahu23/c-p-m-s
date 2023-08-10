import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner'

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const[loading,setloading]=useState(false);

  async function fetchAllUsers(){
    setloading(true)
    const output=await fetch('https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/users.json')
    const data=await output.json();
    const usersArray = Object.values(data);
    setUsers(usersArray);
    setloading(false)


  }

  useEffect( () => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">
                <div className="spinner-container">
                  <Spinner />
                </div>
              </td>
            </tr>
          ) : (
            <>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.FirstName}</td>
                  <td>{user.LastName}</td>
                  <td>{user.Email_ID}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
