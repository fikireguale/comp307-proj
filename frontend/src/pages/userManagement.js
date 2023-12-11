import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Start with an empty list
  const [newUserName, setNewUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const { username } = useParams();

  // Function to refresh the user list from the server

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/get_users_chat/', { params: { username } });
      // Check if the response data is an array before setting the state
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error('Data received is not an array:', response.data);
        setErrorMessage('Received invalid user data from server.');
        setUsers([]); // Reset users to an empty array
      }
    } catch (error) {
      console.error('There was an error fetching the users', error);
      setErrorMessage('Unable to fetch users.');
      setUsers([]); // Reset users to an empty array in case of error
    }
  };

  // Call fetchUsers on component mount
  React.useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    // Check whether the user exists before adding
    const userExists = users.some(user => user.name === newUserName);
    if (newUserName && !userExists) {
      try {
        const response = await axios.post('/add_user_chat/', { username: newUserName, chatName: "COMP307" });
        console.log(response); // log the response from the server
        setUsers([...users, { name: newUserName }]); // Add user to local state
        setNewUserName(''); // Reset the input field
      } catch (error) {
        console.error('There was an error adding the user', error);
        setErrorMessage('Failed to add user.');
      }
    } else {
      alert('User already exists or name is empty!');
    }
  };

  const deleteUser = async (userName) => {
    try {
      const response = await axios.post('/delete_user_chat/', { username: userName, chatName: "COMP307" });
      console.log(response.data);
      console.log(response.status) // Log the response from the server
      setUsers(users.filter(user => user.name !== userName)); // Remove user from local state
    } catch (error) {
      console.error('There was an error deleting the user', error);
      setErrorMessage('Failed to delete user.');
    }
  };

  return (
    <div className='userManagement'>
      <h1>User Management</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div className='inputNewUser'>
        <input 
          type="text" 
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter username" 
        />
        <button onClick={addUser}>Add User</button>
        
      </div>
      <div className='deleteUser'>
        {users.map((user) => (
          <div key={user.id}> {/* Use user.id as the key if it's unique */}
            <span className='user'>{user.name}</span>
            <button onClick={() => deleteUser(user.name)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;