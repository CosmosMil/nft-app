import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';


const Collection = () => {

  const { user } = useContext(AuthContext);
  const [data, setData] = useState<NFT[] | null>(null);

  useEffect(() => {
    if (user) {
      const loggedInUser = user._id;
      const requestOptions = {
        method: 'GET',
      };
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/nfts/all/${loggedInUser}`, requestOptions);
          const result = await response.json();
          console.log(result);
          setData(result);
        } catch (error) {
          console.log('error', error);
        }
      };
      fetchData();
    }
  }, [user]);






  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-5xl text-center text-indigo-400 font-serif p-5">MY COLLECTION</h1>
      <div className='flex flex-wrap justify-center space-x-2 space-y-2 p-5 border-2 border-dotted border-indigo-400'>
        {data ? data.map((item, index) => (
          <div key={index} className='w-52 h-52'>
            <img src={item.preview} alt="NFT" className='object-scale-down w-52 h-52 ' />
          </div>
        )) : <p>loading...</p>}
        <div>
        </div>

      </div>
    </div>
  )
}

export default Collection