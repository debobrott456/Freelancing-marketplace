import React, { use, useState } from 'react';
import { Link, Links, NavLink } from 'react-router';
import { AuthContext } from '../Contexts/Context';
// core version + navigation, pagination modules:


// init Swiper:


const Navbar = () => {
   const [isHovered, setIsHovered] = useState(false);
const {user,signOutUser}=use(AuthContext);
const handleTheme=(checked)=>{const html=document.querySelector('html')
  if(checked) {html.setAttribute("data-theme","dark")}
    else {html.setAttribute("data-theme","light")}
}

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
      <input onChange={(e)=>handleTheme(e.target.checked)}
      type="checkbox" defaultChecked={localStorage.getItem('theme')==="dark"} className='toggle' />
    </>}
   </>
    return (
       

        <nav className="navbar bg-base-100 shadow-sm ">
   <div className="navbar-start">
<img src="https://tse4.mm.bing.net/th/id/OIP.nrDNLabCOPqgNfSCUsB89wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="" style={{width:40}}/>
    <a className="btn btn-ghost  md:text-xl">F-Service</a>
  </div>

  <div className="navbar-center ">
    <ul className="menu menu-horizontal px-1 flex flex-col md:flex-row">
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