import React, { useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Start with an empty list
  const [newUserName, setNewUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  // Function to refresh the user list from the server
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/get_users_chat/', { params: { chatName: "COMP307" }});
      setUsers(response.data); // Assuming the response contains an array of users
    } catch (error) {
      console.error('There was an error fetching the users', error);
      setErrorMessage('Unable to fetch users.');
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
        {users.map((user, index) => (
          <div key={user.name}> {/* Use the username as the key */}
            <span className='user'>{user.name}</span>
            <button onClick={() => deleteUser(user.name)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;