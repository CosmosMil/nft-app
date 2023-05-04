import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import { AuthContext, AuthContextProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';


function App() {
  // const [users, setUsers] = useState<null | Users>(null);

  // const getUsers = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5001/api/user/all");
  //     const result = await response.json();
  //     setUsers(result);
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getUsers();
  // }, [])

  return (
    <>
      {/* <div className="App">
        <h1>heya</h1>
        {users && users.map((user) => {
          return <p key={user._id}>{user.username}</p>
        })}
      </div> */}
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='home' element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
