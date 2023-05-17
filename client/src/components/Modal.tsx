import userEvent from '@testing-library/user-event'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';

function Modal() {
  const { user } = useContext(AuthContext);
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className=''>{ }</div>
    </div>
  )
}

export default Modal