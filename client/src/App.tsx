import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

interface User {
  email: string,
  username: string,
  password: string
  _id: string
}

type Users = User[]

function App() {
  const [users, setUsers] = useState< null | Users> (null);

  const getUsers =async () => {
    try {
      const response = await fetch("http://localhost:5002/api/user/all");
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
    <>
    <div className="App">
      <h1>heya</h1>
      {users && users.map((user) => {
        return <p key = {user._id}>{user.username}</p>
      })}
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='register' element={<Register/> } />
      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
