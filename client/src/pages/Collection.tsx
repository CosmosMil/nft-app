import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Modal from '../components/Modal';
import checkForToken from '../utilities/getToken.js'
import { serverURL } from '../utilities/serverURL';


const Collection = () => {
  // const [modalVisible, setModalVisible] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

  const { user } = useContext(AuthContext);
  const [data, setData] = useState<NFT[]>([]);

  const updateNFT = (updatedNFT: NFT) => {
    if (updatedNFT) {
      setData(data => data && data.map(nft => nft._id === updatedNFT._id ? updatedNFT : nft));
    }
  }

  const removeNFT = (deletedNFT: NFT) => {
    setData(data => data && data.filter(nft => nft._id !== deletedNFT._id));
  };


  useEffect(() => {

    const fetchData = async () => {
      const token = checkForToken(); //get the token from local storage

      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // include the token in your request header
        },
      };
      try {
        const response = await fetch(`${serverURL}/api/nfts/all/${user?._id}`, requestOptions);
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.log('error', error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);






  const openModal = (nft: NFT) => {
    setSelectedNFT(nft);
    // setModalVisible(true);
  }


  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-5xl text-center text-indigo-400 font-serif p-5">MY COLLECTION</h1>
      <div className='p-5 border-2 border-dotted border-indigo-400'>
        <div className='text-center text-indigo-400'><p className='p-3'>
          <i className="fa-solid fa-hand-point-down"></i> click on NFT to update / delete NFT</p></div>
        <div className='flex flex-wrap items-start justify-center'>

          {data ? data.map((nft) => {

            return (
              <React.Fragment key={nft._id}>

                <div className='h-80 w-54 p-3 border-2 border-dotted border-indigo-400 overflow-hidden mx-2 my-2' onClick={() => openModal(nft)} >
                  <img src={nft.preview} alt="NFT" className='object-scale-down w-52 h-52' />
                  <div className='text-center text-yellow-100 p-2'>
                    {nft.name} <br /> {nft.price} <br /> {nft.mintdate}
                  </div>
                </div>
                {selectedNFT &&
                  <Modal
                    _id={nft._id}
                    preview={nft.preview}
                    owner={nft.owner}
                    visible={selectedNFT._id}
                    setSelectedNFT={setSelectedNFT}
                    updateNFT={updateNFT}  // Pass updateNFT function to Modal
                    removeNFT={removeNFT}

                  />}
              </React.Fragment>
            )
          }) : <div><i className="fa-solid fa-yin-yang fa-spin"></i>
          </div>}

        </div>
      </div>



      {/* {selectedNFT && <Modal _id={selectedNFT._id} preview={selectedNFT.preview} owner={selectedNFT.owner} visible={modalVisible} setVisible={setModalVisible} />} */}
    </div>

  )
}

export default Collection