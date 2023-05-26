import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Request = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState<Swap[]>([]);

  useEffect(() => {

    if (user) {
      const userId = user?._id;

      const requestOptions = {
        method: 'GET',
      };

      const showRequests = async () => {

        try {
          const response = await fetch(`http://localhost:5001/api/swaps/requests/${userId}`, requestOptions)

          const result = await response.json();
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
            <div key={swap.id}>
              <div>{swap.nftA}</div>
            </div>

          ))}

        </div>
      </div>
    </div>
  )
}

export default Request