import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PinnedMsgs = () => {
  const [users, setUsers] = useState([]); 
  const [newUserName, setNewUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const { username, discussionName } = useParams();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/message/get_pins/?chatName=${discussionName}&user=${username}`);
      if (Array.isArray(response.data.pinnedMessages)) {
        setUsers(response.data.pinnedMessages);
      } else {
        console.error('Error:', response.data.pinnedMessages, 'not an array');
        setErrorMessage('');
        setUsers([]); 
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('');
      setUsers([]); 
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!newUserName) {
      alert('Please enter a username.');
      return;
    }
  
    try {
      await axios.post('/user/add_user_chat/', { username: newUserName, chatName: discussionName });
      setUsers([...users, { username: newUserName }]); 
      setNewUserName(''); 
    } catch (error) {
      console.error('Error adding user:', error);
      setErrorMessage('');
    }
  };

  const deleteUser = async (userName) => {
    try {
      await axios.post('/user/delete_user_chat/', { username: userName, chatName: discussionName });
      setUsers(users.filter(user => user.username !== userName)); 
    } catch (error) {
      console.error('Error deleting user:', error);
      setErrorMessage('');
    }
  };

  return (
    <div className='userManagement'>
      <h1>Pinned Messages</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div className='deleteUser'>
        {users.map((user) => (
          <div key={user.id}> 
            <span className='user'><h3>{user}</h3></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinnedMsgs;