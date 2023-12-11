import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { name: "User 1", icon: '../assets/user1.png' },
    { name: "User 2", icon: '../assets/user2.png' }
  ]);
  const [newUserName, setNewUserName] = useState('');

  const addUser = () => {
    if (newUserName) {
      setUsers([...users, { name: newUserName, icon: '../assets/default.png' }]);
      setNewUserName('');
    }
  };

  const deleteUser = (userName) => {
    setUsers(users.filter(user => user.name !== userName));
  };

  return (
    <div className='userManagement'>
      <h1>User Management</h1>
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <span>{user.name}</span>
            <button onClick={() => deleteUser(user.name)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <input 
          type="text" 
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter new user name" 
        />
        <button onClick={addUser}>Add User</button>
      </div>
    </div>
  );
};

export default UserManagement;
