import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Start with an empty list
  const [newUserName, setNewUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const { username } = useParams();
  const { chatName } = useParams();

  // Function to refresh the user list from the server

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/chat/get_discussion_users', { params: { name: chatName } });
      // Check if the response data is an array before setting the state
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error(' ', response.data);
        setErrorMessage('');
        setUsers([]); // Reset users to an empty array
      }
    } catch (error) {
      console.error('', error);
      setErrorMessage('');
      setUsers([]); // Reset users to an empty array in case of error
    }
  };

  // Call fetchUsers on component mount
  React.useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!newUserName) {
      alert('Please enter a username.');
      return;
    }
  
    try {
      // Check if user exists in the database
      const checkUserResponse = await axios.get('/chat/check_user', { params: { username: newUserName } });
      if (!checkUserResponse.data.exists) {
        alert('User does not exist!');
        return;
      }
  
      // Add user to the chat
      const response = await axios.post('/chat/add_user_chat/', { username: newUserName, chatName: chatName });
      setUsers([...users, { name: newUserName }]); // Add user to local state
      setNewUserName(''); // Reset the input field
    } catch (error) {
      console.error('There was an error adding the user', error);
      setErrorMessage('');
    }
  };

  const deleteUser = async (userName) => {
    try {
      await axios.post('/chat/delete_user_chat/', { username: userName, chatName: chatName });
      setUsers(users.filter(user => user.name !== userName)); // Remove user from local state
    } catch (error) {
      console.error('There was an error deleting the user', error);
      setErrorMessage('');
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