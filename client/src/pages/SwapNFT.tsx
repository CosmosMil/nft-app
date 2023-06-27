import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext, AuthContextProvider } from '../contexts/AuthContext'

const SwapNFT = () => {

  const { user } = useContext(AuthContext);
  // get the ID from the URL
  const { id } = useParams();
  const [collectionData, setCollectionData] = useState<NFT[] | null>([]);
  const [nftData, setNftData] = useState<NFT | null>(null);
  const [message, setMessage] = useState('');
  //marking the chosen NFT
  const [chosenNft, setChosenNft] =
    useState<NFT | null>(null);



  useEffect(() => {
    if (user) {
      const loggedInUser = user._id;
      const requestOptions = {
        method: 'GET',
      };
      const fetchNFT = async () => {
        try {
          const response = await fetch
            (`${process.env.REACT_APP_BASE_URL}/api/nfts/id/${id}`, requestOptions);
          const result = await response.json();
          setNftData(result);
        } catch (error) {
          console.log(error)
        }

      };

      const fetchData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL} / api / nfts /all/${loggedInUser}`, requestOptions);
          const result = await response.json();
          setCollectionData(result);
        } catch (error) {
          console.log('error', error);
        }
      };

      fetchNFT();
      fetchData()
    }
  }, [user]);

  const chosenNftA = async (nft: NFT, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    const id = nft._id;
    const requestOptions = {
      method: 'GET',
    };
    try {
      const response = await fetch
        (`${process.env.REACT_APP_BASE_URL}/api/nfts/id/${id}`, requestOptions);
      const result = await response.json();
      setChosenNft(result);
    } catch (error) {
      console.log(error)
    }

  }

  const handleReqClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const urlencoded = new URLSearchParams();


    if (user && nftData) {

      const loggedInUser = user._id;

      urlencoded.append('userA', loggedInUser);
      urlencoded.append('userB', nftData.owner);


      if (chosenNft != null) {
        urlencoded.append('nftA', chosenNft._id);
      }
      urlencoded.append('nftB', nftData._id);
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlencoded,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/swaps/new/`, requestOptions);
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setMessage('Your swap request was successful!')
      }
      else {
        throw new Error('Something went wrong, try again!')
      }
    } catch (error) {
      throw new Error('An error occurred, please try again later')
    }

  };


  return (
    <>
      {nftData && (
        <div className="p-4 sm:ml-64">
          <h1 className="text-5xl text-center text-indigo-400 font-serif p-5">{nftData.name && nftData.name}</h1>
          <div className='p-5 border-2 border-dotted border-yellow-100'>
            <div className='flex flex-wrap  justify-center'>
              <img src={nftData.preview} alt={nftData.name} className='object-scale-down w-80 h-80' />

            </div>
            <div className='text-center text-xl text-yellow-100 p-5'>
              {nftData.price && "price: " + nftData.price} <br /> {nftData.mintdate && "mint date: " + nftData.mintdate}
            </div>

          </div>
          <div className='flex justify-center p-7 mt-5'>
            <div className='text-center'>
              <button className='p-2 rounded font-serif bg-indigo-400' onClick={handleReqClick}>SWAP <br />request</button>
              <div className='p-10 text-yellow-100 text-xl'>
                {message && <p> <i className="fa-regular fa-thumbs-up fa-bounce"></i> <br />
                  {message}</p>}</div>

            </div></div>


        </div>
      )}
      {collectionData && (
        <div className="p-4 sm:ml-64">
          <h1 className=" p-3 text-3xl text-center text-indigo-400 font-serif">Swap with:</h1>
          <div className='p-5 border-2 border-dotted border-indigo-400'><div className='flex flex-wrap items-start justify-center'>
            {collectionData.map((nft) => (
              <div key={nft._id} >
                <div className={`p-3 h-64 border-2 border-dotted border-indigo-400 overflow-hidden mx-2 my-2 ${nft._id === chosenNft?._id ? 'border-yellow-100' : 'border-indigo-400'}`
                } onClick={(e) => chosenNftA(nft, e)}>
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

export default SwapNFT