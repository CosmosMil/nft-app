import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Request = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState<Swap[]>([]);

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
              <div className='text-center text-yellow-100 p-8'><button className='mx-4 w-12 hover:bg-indigo-400 rounded'>YES</button> <i className="fa-solid fa-arrow-down"></i> <i className="fa-solid fa-arrow-up"></i><button className='mx-4 w-12 hover:bg-indigo-400 rounded'>NO</button></div>
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