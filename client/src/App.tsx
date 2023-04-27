import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface User {
  email: String,
  username: String,
  password: String
}

type Users = User[]

function App() {
  const [users, setUsers] = useState< null | Users> (null);

  const getUsers =async () => {
    try {
      const response = await fetch("localhost:5001/api/user/all");
      const result = await response.json();
      setUsers(result);
      console.log(result);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers();
}, [])

  return (
    <div className="App">
      <h1>heya</h1>
      {users && users.map((user) => {
        return <p>{user.username}</p>
      })}
    </div>
  );
}

export default App;
