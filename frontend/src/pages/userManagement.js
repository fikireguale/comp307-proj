import React, { useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { name: "User 1" },
    { name: "User 2"}
  ]);
  const [newUserName, setNewUserName] = useState('');

  const addUser = async() => {
    // Check whether the user exists before adding
    const userExists = users.some(user => user.name === newUserName);
    if (newUserName && !userExists) {
      try {
        const response = await axios.post('/add_user_chat/', { username: newUserName, chatName: "COMP307" });
        console.log(response); // log the response from the server
        setUsers([...users, { name: newUserName }]);
      } catch (error) {
        console.error('There was an error adding the user', error);
      }
      setNewUserName('');
    } else {
      alert('User already exists or name is empty!');
    }
  };

  const deleteUser = async(userName) => {
    try {
      const response = await axios.post('/delete_user_chat/', { username: userName, chatName: "COMP307" });
      console.log(response); // Log the response from the server
      setUsers(users.filter(user => user.name !== userName));
    } catch (error) {
      console.error('There was an error deleting the user', error);
    }
  };



  return (
    <div className='userManagement'>
      <h1>User Management</h1>
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
          <div key={index}>
            <span className='user'>{user.name}</span>
            <button onClick={() => deleteUser(user.name)}>Delete</button>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default UserManagement;
