import React, { ChangeEvent, FormEvent, useState } from 'react';


type Props = {}

const Register = (props: Props) => {

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
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}user/new`, requestOptions);
      const result = await response.json();
      console.log(result);
      alert("Success! Check console.")
    } catch (error) {
      console.log(error)
      alert("Something went wrong - check console")
    }
  }

  return (
    <div className="p-4 sm:ml-60">
      <h1 className='text-center text-2xl p-8'>Register</h1>
      <form className="flex items-center justify-center" onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='email' onChange={handleChange} />
        <input type='password' name='password' placeholder='password' onChange={handleChange} />
        <input name='username' placeholder='username' onChange={handleChange} />
        <input type='file' name='avatar' onChange={handleFile} />
        <button className='border-2 m-4' type='submit'>Register me!</button>
      </form>
    </div>
  )
}

export default Register