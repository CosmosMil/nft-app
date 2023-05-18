import userEvent from '@testing-library/user-event'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';

type Props = {
  _id: string,
  name: string,
  price: string,
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
    <>
      {props.visible ? (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center' onClick={closeModal}>
          <div className=''>{props.name}</div>
        </div>) : (null)}
    </>


  )
}

export default Modal