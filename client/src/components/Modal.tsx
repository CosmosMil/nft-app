import userEvent from '@testing-library/user-event'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';

type Props = {
  _id: string,
  name: string,
  price: string,
  mintdate: string,
  preview: string,
  visible: boolean
  setVisible: (visible: boolean) => void,
}

const Modal = (props: Props) => {

  const { user } = useContext(AuthContext);
  const [nftInfo, setNftInfo] = useState(null)

  const _id = props._id;
  useEffect(() => {


    const nftInfo = async (_id: string) => {
      const urlencoded = new URLSearchParams();
      urlencoded.append("_id", _id);
      const requestOptions = {
        method: 'GET',
      };
      try {
        const response = await fetch(`http://localhost:5001/api/nfts/info?${_id}`, requestOptions)
        const result = await response.json();
        console.log(result);
        setNftInfo(result);
      } catch (error) {
        console.log('error', error);
      }
    };
    nftInfo(_id);
  }, [_id]);

  const closeModal = () => {
    props.setVisible(false)
  }


  return (

    <div className="flex justify-center items-center">
      {
        props.visible ? (

          <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center' onClick={closeModal}>
            <div className='p-4 sm:ml-64 bg-indigo-500 w-1/2 h-1/2 sm:w-1/3'>
              <div className='flex flex-col justify-center items-center'>

                <img className='object-scale-down w-52 h-52' src={props.preview} alt='NFT' />
                <form className=' flex flex-col p-3 w-3/4'>
                  <input className='' type='text' name='name' placeholder='name' />
                  <input className='' type='text' name='price' placeholder='price' />
                  <input className='' type='text' name='mint date' placeholder='mint date' />
                </form>

              </div>
            </div>
          </div>) : (null)
      }
    </div>



  )
}

export default Modal