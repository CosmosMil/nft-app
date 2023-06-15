import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import { AuthContext, AuthContextProvider } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Upload from './pages/Upload';
import Collection from './pages/Collection';
import Browse from './pages/Browse';
import SwapNFT from './pages/SwapNFT';
import Request from './pages/Request';
import { RequestContextProvider } from './contexts/RequestContext';


function App() {

  // const [requests, setRequests] = useState<Swap[]>([]);

  // const updateRequest = (updatedRequest: Swap) => {
  //   setRequests(requests => requests && requests.map(swap => swap._id === updatedRequest._id ? updatedRequest : swap));
  // }




  return (
    <>
      <AuthContextProvider>
        <RequestContextProvider>
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path='register' element={<Register />} />
              <Route path='login' element={<Login />} />
              <Route path='/' element={<Homepage />} />
              <Route path='upload' element={<Upload />} />
              <Route path='collection' element={<Collection />} />
              <Route path='browse' element={<Browse />} />
              <Route path='/browse/nft/:id' element={<SwapNFT />} />
              <Route path='/requests/:id' element={<Request />} />
            </Routes>
          </BrowserRouter>
        </RequestContextProvider>
      </AuthContextProvider>

    </>
  );
}

export default App;
