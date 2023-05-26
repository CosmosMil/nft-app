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

        // filter data if user is defined
        if (user) {

          const filtered = result.filter((nft: NFT) => nft.owner !== user._id);

          setData(filtered);
          console.log(filtered)
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
        {user && <div className='text-center text-indigo-400'><p className='p-3'>
          <i className="fa-solid fa-hand-point-down"></i> click on NFT to swap</p></div>}

        <div className='flex flex-wrap items-start justify-center'>
          {data ? data.map((nft) => {


            return (

              <React.Fragment key={nft._id}>


                <div className='h-80 w-54 p-3 border-2 border-dotted border-indigo-400 overflow-hidden mx-2 my-2' onClick={() => {
                  if (user) {
                    window.location.href = `browse/nft/${nft._id}`
                  }
                }}
                >
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