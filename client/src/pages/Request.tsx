import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import SwapNFT from './SwapNFT';

const Request = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState<Swap[]>([]);
  const [swap, setSwap] = useState();



  useEffect(() => {

    if (user) {
      const userId = user._id;

      const requestOptions = {
        method: 'GET',
      };

      const showRequests = async () => {

        try {
          const response = await fetch(`http://localhost:5001/api/swaps/requests/${userId}`, requestOptions)

          const result = await response.json();
          console.log(result)
          setRequests(result);
        }
        catch (error) {
          console.log('error', error);
        }
      };

      showRequests();
    }
  }, [user]);


  const handleYes = async (swap: Swap) => {

    if (user) {
      const userId = user._id;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      const urlencoded = new URLSearchParams();

      urlencoded.append("userA", swap.userA);
      urlencoded.append("userB", swap.userB);
      urlencoded.append("nftA", swap.nftA._id);
      urlencoded.append("nftB", swap.nftB._id);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
      };



      try {
        const response = await fetch("http://localhost:5001/api/swaps/swap", requestOptions)

        const result = await response.json();
        setSwap(result);

      }
      catch (error) {
        console.log('error', error);
      }
    }

  }


  const handleDelete = async (swap: Swap) => {

    try {
      // delete the request
      const deleteOptions = {
        method: 'DELETE'
      };

      const deleteRequest = await fetch(`http://localhost:5001/api/swaps/requests/${swap._id}`, deleteOptions);

      if (!deleteRequest.ok) {

        console.error('Error deleting request', deleteRequest);
      } else {
        // Request was deleted successfully.
        // Now remove the deleted request from our local state.
        setRequests(requests.filter(request => request._id !== swap._id));
      }
    }
    catch (error) {
      console.log('error', error);
    }

  }

  const handleYesClick = (swap: Swap) => {
    handleYes(swap);
    handleDelete(swap);

  }

  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-5xl text-center text-indigo-400 font-serif p-5">REQUESTS</h1>
      <div className='p-5 border-2 border-dotted border-indigo-400'>
        <div className='flex flex-wrap items-start justify-center'>
          {requests && requests.map((swap: Swap) => (
            <div key={swap._id} className='p-3'>
              <div className='h-80 w-54 p-5 my-5 border-2 border-dotted border-indigo-400'>
                <img src={swap.nftA.preview} alt="NFT" className='object-scale-down w-52 h-52' /><div className='text-center text-yellow-100 p-2'>
                  {swap.nftA.name} <br /> {swap.nftA.price} <br /> {swap.nftA.mintdate}
                </div></div>
              <div className='text-center text-yellow-100 p-8'><button className='mx-4 w-12 hover:bg-indigo-400 rounded' onClick={() => handleYesClick(swap)}>YES</button> <i className="fa-solid fa-arrow-down"></i> <i className="fa-solid fa-arrow-up"></i><button className='mx-4 w-12 hover:bg-indigo-400 rounded' onClick={() => handleDelete(swap)}>NO</button></div>
              <div className='h-80 w-54 p-5 my-5 border-2 border-dotted  border-indigo-400'>
                <img src={swap.nftB.preview} alt="NFT" className='object-scale-down w-52 h-52' /><div className='text-center text-yellow-100 p-2'>
                  {swap.nftB.name} <br /> {swap.nftB.price} <br /> {swap.nftB.mintdate}
                </div>
              </div>

            </div>

          ))}

        </div>
      </div>
    </div>
  )
}

export default Request