import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';

type Props = {}

function Login({ }: Props) {
  const { login } = useContext(AuthContext);
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
  }
  return (

    < div className="p-4 sm:ml-60">
      <h1 className='text-center text-2xl p-8'>Login</h1>
      <form className="flex items-center justify-center" onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='email' onChange={handleChange} />
        <input type='password' name='password' placeholder='password' onChange={handleChange} />
        <button className='border-2 m-4' type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Login