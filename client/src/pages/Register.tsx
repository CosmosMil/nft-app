import React, { useState } from 'react'

type Props = {}

// interface FormData {
//   email: String,
//   password: String,
//   username: String
// }

const Register = (props: Props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: ""
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    console.log(formData)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", formData.email);
    urlencoded.append("username", formData.username);
    urlencoded.append("password", formData.password);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
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
        <button type='submit'>Register Me!</button>
      </form>
    </div>
  )
}

export default Register