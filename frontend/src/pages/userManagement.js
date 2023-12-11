import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { name: "User 1" },
    { name: "User 2"}
  ]);
  const [newUserName, setNewUserName] = useState('');

  const addUser = () => {
    //chack whether the user exists before
    if (newUserName) {
      setUsers([...users, { name: newUserName }]);
      setNewUserName('');
    }
  };

  const deleteUser = (userName) => {
    setUsers(users.filter(user => user.name !== userName));
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
