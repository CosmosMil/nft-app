import React, { useState } from 'react'

type Props = {}
type Avatar = undefined | File

interface FormData {
  email: String,
  password: String,
  username: String,
  avatar: Avatar
}

const Register = (props: Props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    avatar: ""
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFile = (e: any) => {
    // console.log(typeof e.target.files[0])n
    setFormData({ ...formData, avatar: e.target.files[0] })
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
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
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/user/new`, requestOptions)
      const result = await response.json();
      console.log(result);
      alert("Success!")
    } catch (error) {
      console.log(error)
      alert("Something went wrong - check console")
    }
  }


  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='email' onChange={handleChange} />
        <input type='password' name='password' placeholder='password' onChange={handleChange} />
        <input type='text' name='username' placeholder='username' onChange={handleChange} />
        <input type='file' name='avatar' onChange={handleFile} />
        <button type='submit'>Register Me!</button>
      </form>
    </div>
  )
}

export default Register