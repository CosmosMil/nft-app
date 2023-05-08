import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom';

type Props = {}

const Navbar = (props: Props) => {
  const { user, login, logout } = useContext(AuthContext)
  return (
    <div>
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" className="flex items-center justify-center w-10 h-10 p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <i className=" fa-solid fa-bars" style={{ color: "#fefc78", }}></i>
      </button>

      <aside id="default-sidebar" className="fixed top-0 left-0 w-52 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-indigo-700 dark:bg-indigo-950">

          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className=" fa-solid fa-ghost"></i>
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className="fa-duotone fa-palette"> </i>
                <span className="flex-1 ml-3 whitespace-nowrap">NFTs</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className="fa-solid fa-hippo"></i>
                <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className="fa-solid fa-rocket"></i>
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </aside >
    </div>


  )
}

export default Navbar