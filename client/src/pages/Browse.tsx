import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Browse = () => {
  const [data, setData] = useState<NFT[] | null>(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    const fetchNFTs = async () => {


      try {

        const response = await fetch("http://localhost:5001/api/nfts/all", requestOptions);
        const result = await response.json();
        console.log('Fetched NFTs: ', result);
        console.log('User: ', user);

        // Check if user is defined and then filter data
        if (user && user._id) {
          const filtered = result.filter((nft: NFT) => nft.owner._id !== user._id);
          setData(filtered);
        }
        else {
          setData(result);
        }

      }
      catch (error) {
        console.log('error', error);
      }



    };
    fetchNFTs();
  }, [user]);



  return (

    <div className="p-4 sm:ml-64">
      <h1 className="text-5xl text-center text-indigo-400 font-serif p-5">BROWSE NFTS</h1>
      <div className='p-5 border-2 border-dotted border-indigo-400'>
        <div className='flex flex-wrap items-start justify-center'>
          {data ? data.map((nft) => {


            return (
              <React.Fragment key={nft._id}>

                <div className='h-80 w-54 p-3 border-2 border-dotted border-indigo-400 overflow-hidden mx-2 my-2' >
                  <img src={nft.preview} alt="NFT" className='object-scale-down w-52 h-52' />
                  <div className='text-center text-yellow-100 p-2'>
                    {nft.name} <br /> {nft.price} <br /> {nft.mintdate}
                  </div>
                </div>
              </React.Fragment>
            );
          }) : <div><i className="fa-solid fa-yin-yang fa-spin"></i>
          </div>}



        </div>

      </div>
    </div>



  )
}

export default Browse