import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { RequestContext } from '../contexts/RequestContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { serverURL } from '../utilities/serverURL';


type Props = {

  // updateRequest: (updatedRequest: Swap) => void
}

const Sidebar = (props: Props) => {


  const { user, logout } = useContext(AuthContext);
  let navigate = useNavigate();

  const { requests, setRequests } = useContext(RequestContext);

  const [showSidebar, setShowSidebar] = useState(false);


  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false)
  }

  useEffect(() => {

    if (user) {
      const userId = user._id;

      const requestOptions = {
        method: 'GET',
      };

      const showRequests = async () => {

        try {
          const response = await fetch(`${serverURL}/api/swaps/requests/${userId}`, requestOptions)

          const result = await response.json();
          setRequests(result);
        }
        catch (error) {
          console.log('error', error);
        }
      };

      showRequests();
    }
  }, [user]);






  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button onClick={openSidebar}
        className="flex items-center justify-center w-10 h-10 p-2 mt-2 ml-3 text-sm rounded-lg sm:hidden hover:bg-gray-400  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <i className=" fa-solid fa-bars" style={{ color: "#fefc78", }}></i>
      </button>


      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">

        <div className="h-full px-3 py-4 overflow-y-auto bg-indigo-500 opacity-95">
          {showSidebar ? (
            <div className="absolute top-0 right-0 -mr-10 pt-2 sm:hidden"><button onClick={closeSidebar} type="button" className="ml-1 flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-400 focus:ring-inset "><span className="sr-only">Close sidebar</span><i className="fa-solid fa-xmark" style={{ color: "#fefc78" }} ></i></button></div>) : (null)}

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
              <NavLink to="/browse" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-500 dark:hover:bg-gray-700">
                <i className="fa-solid fa-magnifying-glass"></i>
                <span className="flex-1 ml-3 whitespace-nowrap">Browse NFTs</span>
              </NavLink>
            </li>


            <div>
              {user ? (
                <div>
                  <li>
                    <NavLink to="/upload" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-500 dark:hover:bg-gray-700">
                      <i className="fa-sharp fa-solid fa-cubes"> </i>
                      <span className="flex-1 ml-3 whitespace-nowrap">Upload NFTs</span>
                    </NavLink>
                  </li>
                  <li>
                    <div className='text-left p-7 mt-5 font-serif border-2 border-dotted border-yellow-100'>

                      {' Welcome back ' + user.username + '!'}
                      {requests &&

                        <button onClick={() => navigate(`requests/${user._id}`)}
                          className='hover:bg-slate-500 text-yellow-100 rounded mt-3'>

                          {requests.length === 1 && 'you have 1 open request'}
                          {requests.length > 1 && `you have ${requests.length} requests`}
                        </button>}



                    </div>

                    <div className="flex justify-end items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-slate-500 dark:hover:bg-gray-700 space-x-2">
                      <i className="fa-solid fa-backward"></i>
                      <button onClick={async () => {
                        try {
                          logout()
                          console.log("sign out successful");
                          navigate('/');
                        } catch (error) { console.log(error) };
                      }}
                      >Log Out
                      </button> </div> </li> </div>) :
                (<div>
                  <li>
                    <NavLink to="/login" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-500 dark:hover:bg-gray-700">
                      <i className="fa-solid fa-hippo"></i>
                      <span className="flex-1 ml-3 whitespace-nowrap">Log In</span> </NavLink></li>

                  <li>
                    <NavLink to="/register" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-500 dark:hover:bg-gray-700">
                      <i className="fa-solid fa-rocket"></i>
                      <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                    </NavLink></li></div>)}
            </div>




          </ul>
        </div>
      </aside >
    </div >


  )
}

export default Sidebar