import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'


type Props = {}

interface User {
  email: string,
  username: string,
  password: string
}

type Users = User[]

const Homepage = (props: Props) => {

  // const [showSidebar, setShowSidebar] = useState(false);

  // const toggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  // };


  // const [users, setUsers] = useState<Users>([]);
  // const [user, setUser] = useState<User | null>(null);

  // const getUsers = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5001/api/user/all");
  //     const result = await response.json();
  //     setUsers(result);
  //     console.log("all users:", result)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const getUserById = async () => {
  //   const id = "6447a2bc1362e69f068f823b";
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/users/id/${id}`);
  //     const result = await response.json();
  //     console.log("single user:", result);
  //     setUser(result);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   // getUsers();
  //   getUserById();
  // }, [])

  return (
    <>
      {/* <Sidebar /> */}
      <div className="p-4 sm:ml-60"
      // onClick={() => {
      //   if (showSidebar) {
      //     toggleSidebar();
      //   }
      // }}
      >
        <div>
          <div className="grid grid-cols-3 mb-4 gap-4">
            <div className="flex items-center justify-center">
              <img src="images/cryptopunk.jpg" />
            </div>
            <div className='grid items-center justify-center p-4 w-6'>

              <i className="fa-solid fa-slash fa-spin-pulse" style={{ color: "#fefc78", }}></i>
              <i className="fa-solid fa-slash fa-spin-pulse" style={{ color: "#fefc78", }}></i>
              <i className="fa-solid fa-slash fa-spin-pulse" style={{ color: "#fefc78", }}></i>
            </div>
            <div className="flex items-center justify-center">
              <img src="images/orbital-ape.png" />
            </div>

          </div>
          <div className="flex items-center justify-center mb-4">
            <span className='grid items-center justify-center p-4'>
              <i className="fa-solid fa-slash fa-spin-pulse"></i>
              <i className="fa-solid fa-slash fa-spin-pulse"></i>
              <i className="fa-solid fa-slash fa-spin-pulse"></i>
            </span>
            <img src="images/nft-banner.jpg" className='object-contain' />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center ">
              <div className="flex items-center justify-center">
                <img src="images/crego.jpg" />
              </div>

            </div>
            <div className="flex items-center justify-center rounded ">

            </div>

          </div>





        </div>
      </div>

    </>
    // <div>
    //   <h1>hello</h1>
    //   <h2>All users:</h2>
    //   {users.map((user, i) => {
    //     return <p key={i}>{user.username}</p>
    //   })}
    //   <h2>User with ID: 6447a2bc1362e69f068f823b</h2>
    //   {user && <p>{user.username}</p>}
    // </div>
  )
}

export default Homepage