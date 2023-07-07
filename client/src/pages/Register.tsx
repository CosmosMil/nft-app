import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../utilities/serverURL';


type Props = {}

const Register = (props: Props) => {

  let navigate = useNavigate();
  const [formData, setFormData] = useState<SubmitRegisterData>({
    email: "",
    password: "",
    username: "",
    avatar: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, avatar: e.target.files[0] })
    } else {
      setFormData({ ...formData, avatar: "" })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    const submitData = new FormData();
    submitData.append("email", formData.email);
    submitData.append("username", formData.username);
    submitData.append("password", formData.password);
    submitData.append("avatar", formData.avatar);
    const requestOptions = {
      method: 'POST',
      body: submitData,
    };
    try {
      const response = await fetch(`${serverURL}user/new`, requestOptions);
      const result = await response.json();
      console.log(result);
      navigate('/login')
    }

    catch (error) {
      console.log(error)

    }

  }

  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-5xl text-center text-indigo-400 font-serif p-5">SIGN UP</h1>

      <div className="flex justify-center w-full mx-auto sm:max-w-lg">

        <div className="flex flex-col  justify-center my-20 bg-indigo-500 rounded-lg w-72 h-72">

          <form className="text-center space-y-3" onSubmit={handleSubmit}>
            <input type='email' name='email' placeholder='email' onChange={handleChange} />
            <input type='password' name='password' placeholder='password' onChange={handleChange} />
            <input className='h-10 w-50 m-3 p-3' name='username' placeholder='username' onChange={handleChange} />
            <input className='w-52 bg-slate-500 text-xs' type='file' name='avatar' onChange={handleFile} />
            <div className='p-2'>
              <button type="submit" className='p-1 rounded text-yellow-100 ml-40 hover:bg-slate-500'>Register me!</button></div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Register