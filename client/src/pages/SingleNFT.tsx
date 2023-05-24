import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext, AuthContextProvider } from '../contexts/AuthContext'

const SingleNFT = () => {

  const { user } = useContext(AuthContext);
  // get the ID from the URL
  const { id } = useParams();
  const [nftData, setNftData] = useState<NFT | null>(null);

  useEffect(() => {
    if (user) {
      const requestOptions = {
        method: 'GET',
      };
      const fetchNFT = async () => {
        try {
          const response = await fetch
            (`http://localhost:5001/api/nfts/id/${id}`, requestOptions);
          const result = await response.json();
          setNftData(result);
        } catch (error) {
          console.log(error)
        }

      };

      fetchNFT();
    }
  }, [user]);



  return (
    <>
      {nftData &&
        <div className="p-4 sm:ml-64">
          <h1 className="text-5xl text-center text-indigo-400 font-serif p-5">{nftData.name && nftData.name}</h1>
          <div className='p-5 border-2 border-dotted border-indigo-400'>
            <div className='flex flex-wrap items-start justify-center'>
              <img src={nftData.preview} alt={nftData.name} className='object-scale-down w-80 h-80' />

            </div>
            <div className='text-center text-xl text-yellow-100 p-5'>
              {nftData.price && "price: " + nftData.price} <br /> {nftData.mintdate && "mint date: " + nftData.mintdate}
            </div>
          </div>
        </div>}
    </>
  )
}

export default SingleNFT