import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Modal from '../components/Modal';
import { NOTFOUND } from 'dns';
import { isTemplateSpan } from 'typescript';


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
      <div className='p-5 border-2 border-dotted border-indigo-400'>
        <div className='text-center text-indigo-400'><p className='p-3'>
          <i className="fa-solid fa-hand-point-down"></i> click on NFT to add / update info</p></div>
        <div className='flex flex-wrap items-start justify-center'>

          {data ? data.map((item) => (
            <div className=''>
              <div key={item._id} className='h-80 w-54 p-3 border-2 border-dotted border-indigo-400 overflow-hidden mx-2 my-2'>
                <img src={item.preview} alt="NFT" className='object-scale-down w-52 h-52' onClick={() => openModal(item)} />
                <div className='text-center text-yellow-100 p-2'>
                  {item.name} <br /> {item.price} <br /> {item.mintdate}
                </div>
              </div>
            </div>
          )) : <div><i className="fa-regular fa-spinner fa-spin"></i>
          </div>}
        </div>
      </div>

      {selectedNFT && <Modal _id={selectedNFT._id} name={selectedNFT.name || ''} price={selectedNFT.price || ''} mintdate={selectedNFT.mintdate || ''} preview={selectedNFT.preview} visible={modalVisible} setVisible={setModalVisible} />}
    </div>
  )
}

export default Collection