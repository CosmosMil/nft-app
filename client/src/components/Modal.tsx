
import React, { useContext, useEffect, useState, FormEvent, ChangeEvent } from 'react'
import { SubmitOptions } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { serverURL } from '../utilities/serverURL';

type Props = {

  _id: string,
  preview: string,
  owner: string,
  visible: string,
  setSelectedNFT: (nft: NFT | null) => void;
  updateNFT: (updatedNFT: NFT) => void;
  removeNFT: (deletedNFT: NFT) => void;
}



const Modal = (props: Props) => {

  const [open, setOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const [nftArray, setNftArray] = useState<NFT[]>([]);

  const [nftInfo, setNftInfo] = useState<NFT>({
    _id: props._id,
    preview: props.preview,
    owner: props.owner,
    name: "",
    price: "",
    mintdate: ""
  }
  )

  useEffect(() => {
    if (props.visible === props._id) {
      setOpen(true)
    }
    else {
      setOpen(false)
    }

  }, [props.visible])


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      setNftInfo({ ...nftInfo, [e.target.name]: e.target.value })
    }
  }

  const handleSubmitInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {


      const submitData = JSON.stringify({ ...nftInfo })



      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: submitData,
      };
      console.log('nftInfo: ', nftInfo);

      try {
        const response = await fetch(`${serverURL}/api/nfts/update`, requestOptions)
        const result = await response.json();

        props.updateNFT(result);

      } catch (error) {
        console.log('error', error);
      }
    }
    closeModal();

  };

  const handleDelete = async (nft: NFT) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("_id", nft._id)
    try {
      //delete the NFT
      const deleteOptions = {
        method: 'DELETE',
        body: urlencoded
      };
      const deleteRequest = await fetch("https://nft-app-server.vercel.app/api/nfts/delete/", deleteOptions);

      if (!deleteRequest.ok) {
        console.error('Error deleting NFT', deleteRequest);
      } else {
        props.removeNFT(nft);
      }
    }
    catch (error) {
      console.log('error', error);
    }

  }



  const closeModal = () => {
    setOpen(false);
    props.setSelectedNFT(null)
  }

  return (

    <div className="">
      {
        open &&

        <div className='fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex justify-center items-center' >
          <div className='flex items-start'><div className='p-4 sm:ml-64 bg-indigo-500 flex flex-col justify-center items-center'>

            <img className='object-scale-down w-52 h-52' src={props.preview} alt='NFT' />
            <form className=' flex flex-col p-3 w-3/4' onSubmit={handleSubmitInfo}>
              <input className='' type='text' name='name' placeholder='name' onChange={handleChange} />
              <input className='' type='text' name='price' placeholder='price' onChange={handleChange} />
              <input className='' type='text' name='mintdate' placeholder='mint date' onChange={handleChange} />
              <div className='p-2'>
                <button type="submit" className='p-1 rounded text-yellow-100 ml-40 hover:bg-slate-500'>submit</button></div>
              <div className='p-2'>
                <button onClick={() => handleDelete(nftInfo)} className='p-1 rounded text-red-600 ml-40 hover:bg-slate-500'>delete NFT</button></div>
            </form>


          </div>
            <button onClick={closeModal} type="button" className="ml-2 flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-400 focus:ring-inset "><span className="sr-only">Close sidebar</span><i className="fa-solid fa-xmark" style={{ color: "#fefc78" }} ></i></button>
          </div>




        </div>


      }
    </div >



  )
}

export default Modal