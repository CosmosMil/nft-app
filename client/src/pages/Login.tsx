import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

type Props = {}

function Login({ }: Props) {

  const { login } = useContext(AuthContext);
  let navigate = useNavigate();
  const [formData, setFormData] = useState<SubmitLoginData>({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData.email, formData.password);

    navigate('/collection')
  }
  return (

    <div className="p-4 sm:ml-64">
      <h1 className="text-5xl text-center text-indigo-400 font-serif p-5">LOG IN</h1>

      <div className="flex justify-center w-full mx-auto sm:max-w-lg">

        <div className="flex flex-col items-center justify-center my-20 bg-indigo-500  rounded-lg p-10 w-72 h-72">

          <form className='text-center space-y-3' onSubmit={handleSubmit}>
            <input className='' type='email' name='email' placeholder='email' onChange={handleChange} />
            <input type='password' name='password' placeholder='password' onChange={handleChange} />
            <div className='p-2'>
              <button type="submit" className='p-1 rounded text-yellow-100 ml-40 hover:bg-slate-500'>Submit</button></div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login