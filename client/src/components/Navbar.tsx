import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom';

type Props = {}

const Navbar = (props: Props) => {
  const { user, login, logout } = useContext(AuthContext)
  return (
    <div>
      <h1>Navbar</h1>
      <h1>Welcome {user ? user.username : "guest"}</h1>n
      <div>{user ? <p>User logged in!</p> : <p>User logged out!</p>}</div>
      <div> {user ? <button onClick={logout}>Logout</button> : <Link to='/login'>Login</Link>}</div>
      <div>
        <Link to='/'>Home</Link>
      </div>
    </div>
  )
}

export default Navbar