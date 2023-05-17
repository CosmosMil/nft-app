import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Link, NavLink } from 'react-router-dom';


type Props = {
  // showSidebar: boolean;
  // toggleSidebar: () => void;
}

const Sidebar = (props: Props) => {
  const { user, logout } = useContext(AuthContext);

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  window.onclick = () => {
    setShowSidebar(false)
  }
  // const toggleButton = () => {
  //   console.log("button clicked");
  //   if (showSidebar === false) {
  //     setSidebarShown(true)
  //   }
  //   else {
  //     setSidebarShown(false)
  //   }
  // };

  // console.log("testing")

  // const ddd = ${ showSidebar ?"translate-x-0": "-translate-x-full"} sm: translate-x - 0`} aria-label="Sidebar"

  return (
    <div onClick={(e) => e.stopPropagation()} className=''>
      <button onClick={toggleSidebar}
        className="flex items-center justify-center w-10 h-10 p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <i className=" fa-solid fa-bars" style={{ color: "#fefc78", }}></i>
      </button>


      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">

        <div className="h-full px-3 py-4 overflow-y-auto bg-indigo-500">

          <ul className="space-y-2 font-medium">
            <li>
              {!user ?
                (<NavLink to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-500 dark:hover:bg-gray-700">
                  <i className=" fa-solid fa-ghost"></i>
                  <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
                </NavLink>) : (<NavLink to="/collection" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-500 dark:hover:bg-gray-700">
                  <i className=" fa-solid fa-ghost"></i>
                  <span className="flex-1 ml-3 whitespace-nowrap">Home</span></NavLink>)}
            </li>
            <li>
              <NavLink to="/upload" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-500 dark:hover:bg-gray-700">
                <i className="fa-sharp fa-solid fa-cubes"> </i>
                <span className="flex-1 ml-3 whitespace-nowrap">Upload NFTs</span>
              </NavLink>
            </li>
            <li>
              {user ? (
                <div>
                  <div className='text-center p-7 font-serif'>
                    <i className="fa-regular fa-hand"></i>
                    {' Welcome back ' + user.username + '!'}

                  </div>

                  <div className="flex justify-end items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-slate-500 dark:hover:bg-gray-700 space-x-2">
                    <i className="fa-solid fa-backward"></i>
                    <button onClick={async () => {
                      try {
                        logout()
                        console.log("sign out successful");
                      } catch (error) { console.log(error) };
                    }}
                    >Log Out
                    </button> </div> </div>) :
                (<div>
                  <NavLink to="/login" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-500 dark:hover:bg-gray-700">
                    <i className="fa-solid fa-hippo"></i>
                    <span className="flex-1 ml-3 whitespace-nowrap">Log In</span> </NavLink>


                  <NavLink to="/register" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-500 dark:hover:bg-gray-700">
                    <i className="fa-solid fa-rocket"></i>
                    <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                  </NavLink></div>)}
            </li>
            <div className='p-20'></div>



          </ul>
        </div>
      </aside >
    </div >


  )
}

export default Sidebar