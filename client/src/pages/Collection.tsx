import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Modal from '../components/Modal';


const Collection = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

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


  const openModal = (nft: NFT) => {
    setSelectedNFT(nft);
    setModalVisible(true);
  }


  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-5xl text-center text-indigo-400 font-serif p-5">MY COLLECTION</h1>
      <div className='flex flex-wrap justify-center space-x-2 space-y-2 p-5 border-2 border-dotted border-indigo-400'>
        {data ? data.map((item, index) => (
          <div key={index} className='w-52 h-52 p-3'>
            <img src={item.preview} alt="NFT" className='object-scale-down w-52 h-52' onClick={() => openModal(item)} />
          </div>
        )) : <div><i className="fa-regular fa-spinner fa-spin"></i>
        </div>}
      </div>
      /:Render the modal component and pass in the selected NFT/
      {selectedNFT && <Modal _id={selectedNFT._id} name={selectedNFT.name || ''} price={selectedNFT.price || ''} visible={modalVisible} setVisible={setModalVisible} />}
    </div>
  )
}

export default Collection