import React, { use, useState } from 'react';
import { Link, Links, NavLink } from 'react-router';
import { AuthContext } from '../Contexts/Context';
// core version + navigation, pagination modules:


// init Swiper:


const Navbar = () => {
   const [isHovered, setIsHovered] = useState(false);
const {user,signOutUser}=use(AuthContext);
const handleSignOut=()=>{
signOutUser()
.then(result=>console.log(result.user))
.catch(error=>console.log(error))
}
    const links=<><li><NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        Home
      </NavLink></li>
    {/* <li><NavLink
        to="/myJobs"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        MyJobs
        
      </NavLink></li> */}
      <li><NavLink
        to="/allJobs"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        All Jobs
      </NavLink></li>

       <li><NavLink
        to="/myJobs"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        My Jobs
      </NavLink></li>
    
    <li><NavLink
        to="/addJobs"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        Add Jobs
      </NavLink></li>

    {user && <><li><NavLink
        to="/accepted"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        Accepted Task
      </NavLink></li>
    </>}
   </>
    return (
       

        <nav className="navbar bg-base-100 shadow-sm">
   <div className="navbar-start">
    <img src="https://images-platform.99static.com/3-Gw3-XKAjke2wz61jujQkx8dUs=/378x266:1622x1510/fit-in/99designs-contests-attachments/138/138432/attachment_138432570" alt="" style={{width:40}}/>
    <a className="btn btn-ghost  md:text-xl">ToyZen</a>
  </div>

  <div className="navbar-center">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">{user ? (
  <div className="flex items-center gap-1 md:gap-2">
    {user.photoURL && (
      <div  className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}><img 
        src={user.photoURL}
        alt="User"
        className="w-10 h-10 rounded-full border border-gray-300"
      />
        {isHovered && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-sm rounded">
          {user.displayName}
        </div>
      )}
   </div>
    )}
    <a onClick={handleSignOut} className="btn">Sign Out</a>
  </div>
) : (
  <Link to="/login">
    <button className="btn">Login</button>
  </Link>
)}
    
  </div>
</nav>
    );
};

export default Navbar;