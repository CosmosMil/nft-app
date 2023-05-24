import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext, AuthContextProvider } from '../contexts/AuthContext'

const SingleNFT = () => {

  const { user } = useContext(AuthContext);
  // get the ID from the URL
  const { id } = useParams();
  const [collectionData, setCollectionData] = useState<NFT[] | null>([]);
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
          setCollectionData(result);
        } catch (error) {
          console.log('error', error);
        }
      };
      fetchData();
    }
  }, [user]);



  return (
    <>
      {nftData && (
        <div className="p-4 sm:ml-64">
          <h1 className="text-5xl text-center text-indigo-400 font-serif p-5">{nftData.name && nftData.name}</h1>
          <div className='p-5 border-2 border-dotted border-indigo-400'>
            <div className='flex flex-wrap  justify-center'>
              <img src={nftData.preview} alt={nftData.name} className='object-scale-down w-80 h-80' />

            </div>
            <div className='text-center text-xl text-yellow-100 p-5'>
              {nftData.price && "price: " + nftData.price} <br /> {nftData.mintdate && "mint date: " + nftData.mintdate}
            </div>

          </div>
          <div className='flex justify-center p-7'>
            <button className='p-2 rounded font-serif bg-indigo-400'>SWAP <br />request</button>
          </div>
        </div>
      )}
      {collectionData && (
        <div className="p-4 sm:ml-64">
          <h1 className=" p-3 text-3xl text-center text-indigo-400 font-serif">My Collection</h1>
          <div className='p-5 border-2 border-dotted border-indigo-400'><div className='flex flex-wrap items-start justify-center'>
            {collectionData.map((nft) => (
              <div key={nft._id} >
                <div className='p-3 h-64 border-2 border-dotted border-indigo-400 overflow-hidden mx-2 my-2' >
                  <img src={nft.preview} alt={nft.name} className='object-scale-down w-32 h-32 p-2' />
                  <div className='text-center text-yellow-100 p-5'>
                    {nft.name && nft.name} <br /> {nft.price && nft.price}<br /> {nft.mintdate && nft.mintdate}
                  </div>
                </div>

              </div>
            ))}
          </div>
          </div>

        </div>
      )}

    </>
  );
}

export default SingleNFT