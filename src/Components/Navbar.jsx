import React, { use, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/Context';
import { MdLightMode, MdNightlight } from 'react-icons/md';
import { LogOut, User, LayoutDashboard, Briefcase } from 'lucide-react'; // Modern icons
import logo from "../assets/jannik-jwdshots-uPjzjd5LPtY-unsplash.jpg"

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, signOutUser } = use(AuthContext);
  const navigate=useNavigate;

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    // This part ensures Tailwind's 'dark:' classes trigger correctly
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() =>{ navigate("/login", { replace: true });}
    
    )
      .catch(error => console.log(error));
  };

  const links = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? "text-amber-500 font-bold border-b-2 border-amber-500" : "hover:text-amber-500 transition-colors"}>Home</NavLink></li>
      <li><NavLink to="/allJobs" className={({ isActive }) => isActive ? "text-amber-500 font-bold border-b-2 border-amber-500" : "hover:text-amber-500 transition-colors"}>All Jobs</NavLink></li>
       <li><NavLink to="/dashboard/myjobs" className={({ isActive }) => isActive ? "text-amber-500 font-bold border-b-2 border-amber-500" : "hover:text-amber-500 transition-colors"}>My Jobs</NavLink></li>
          <li><NavLink to="/dashboard/addJobs" className={({ isActive }) => isActive ? "text-amber-500 font-bold border-b-2 border-amber-500" : "hover:text-amber-500 transition-colors"}>Add Jobs</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-amber-500 font-bold border-b-2 border-amber-500" : "hover:text-amber-500 transition-colors"}>About Us</NavLink></li>
          <li><NavLink to="/faq" className={({ isActive }) => isActive ? "text-amber-500 font-bold border-b-2 border-amber-500" : "hover:text-amber-500 transition-colors"}>FAQ</NavLink></li>
      {user && (
        <>
         
          <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-amber-500 font-bold border-b-2 border-amber-500" : "hover:text-amber-500 transition-colors"}>Dashboard</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar bg-base-100 dark:bg-gray-900 dark:text-white shadow-md px-4 md:px-8 sticky top-0 z-50 transition-colors duration-300">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-52 uppercase font-bold">
            {links}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-amber-500" />
          <span className="font-black text-xl tracking-tighter hidden md:block">F-SERVICE</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6 font-semibold uppercase text-xs tracking-widest">
          {links}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-2xl">
          {theme === "light" ? <MdNightlight /> : <MdLightMode className="text-amber-400" />}
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            {/* Direct Logout Button */}
            {/* <button onClick={handleSignOut} className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none hidden md:flex gap-2">
              <LogOut size={16} /> Logout
            </button> */}
           <button onClick={handleSignOut} className="btn btn-sm bg-[#af3f0f] hover:bg-red-600 text-white border-none hidden md:flex gap-2">
              <LogOut size={16} /> Logout
            </button>
            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                <div className="w-10 rounded-full border-2 border-amber-500">
                  <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="Avatar" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-4 shadow-xl menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-2xl w-64 border border-gray-100 dark:border-gray-700">
                <li className="mb-2 px-2 py-1 border-b dark:border-gray-700">
                  <p className="font-bold text-amber-500">{user?.displayName}</p>
                  <p className="text-[10px] opacity-60 truncate">{user?.email}</p>
                </li>
                <li><Link to="/dashboard/myjobs"><LayoutDashboard size={16} /> Dashboard</Link></li>
                <li><Link to="/dashboard/profile"><User size={16} /> My Profile</Link></li>
                <li><Link to="/dashboard/accepted"><Briefcase size={16} /> My Tasks</Link></li>
                <li className=" mt-2 pt-2 border-t dark:border-gray-700">
                  <button onClick={handleSignOut} className="bg-red-50 text-red-600 hover:bg-red-100">Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn bg-[#a52f12] hover:bg-amber-600 border-none text-white px-8 rounded-xl shadow-lg shadow-amber-200/50">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { use, useEffect, useState } from 'react';
// import { Link, Links, NavLink } from 'react-router';
// import { AuthContext } from '../Contexts/Context';
// import { MdLightMode, MdNightlight } from 'react-icons/md';
// import logo from "../assets/jannik-jwdshots-uPjzjd5LPtY-unsplash.jpg"



// const Navbar = () => {
//    const [isHovered, setIsHovered] = useState(false);
 
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || "light"
//   );

  
//   useEffect(() => {
//     const html = document.querySelector("html");
//     html.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

// const {user,signOutUser}=use(AuthContext);


// const handleSignOut=()=>{
// signOutUser()
// .then(result=>console.log(result.user))
// .catch(error=>console.log(error))
// }
//     const links=<><li><NavLink
//         to="/"
//         className={({ isActive }) =>
//           isActive
//             ? "text-blue-600 font-semibold border-b-2 border-pink-600"
//             : "text-gray-600 hover:text-blue-500"
//         }
//       >
//         Home
//       </NavLink></li>
//     {/* <li><NavLink
//         to="/myJobs"
//         className={({ isActive }) =>
//           isActive
//             ? "text-blue-600 font-semibold border-b-2 border-pink-600"
//             : "text-gray-600 hover:text-blue-500"
//         }
//       >
//         MyJobs
        
//       </NavLink></li> */}
//       <li><NavLink
//         to="/allJobs"
//         className={({ isActive }) =>
//           isActive
//             ? "text-blue-600 font-semibold border-b-2 border-pink-600"
//             : "text-gray-600 hover:text-blue-500"
//         }
//       >
//         All Jobs
//       </NavLink></li>

//        <li><NavLink
//         to="/myJobs"
//         className={({ isActive }) =>
//           isActive
//             ? "text-blue-600 font-semibold border-b-2 border-pink-600"
//             : "text-gray-600 hover:text-blue-500"
//         }
//       >
//         My Jobs
//       </NavLink></li>
    
//     <li><NavLink
//         to="/addJobs"
//         className={({ isActive }) =>
//           isActive
//             ? "text-blue-600 font-semibold border-b-2 border-pink-600"
//             : "text-gray-600 hover:text-blue-500"
//         }
//       >
//         Add Jobs
//       </NavLink></li>

//     {user && <><li><NavLink
//         to="/accepted"
//         className={({ isActive }) =>
//           isActive
//             ? "text-blue-600 font-semibold border-b-2 border-pink-600"
//             : "text-gray-600 hover:text-blue-500"
//         }
//       >
//         Accepted Task
//       </NavLink></li></>}
//     <button
//         onClick={toggleTheme}
//         className="btn btn-ghost text-xl"
//       >
//         {theme === "light" ? (
//           <MdNightlight />  
//         ) : (
//           <MdLightMode />    
//         )}
//       </button>
    
//    </>
//     return (
       

//         <nav className="navbar bg-base-100 shadow-sm ">
//    <div className="navbar-start">
// <img src={logo} alt="" style={{width:40, height:40}}/>
//     <a className="btn btn-ghost  md:text-xl">F-Service</a>
//   </div>

//   <div className="navbar-center ">
//     <ul className="menu menu-horizontal px-1 flex flex-col md:flex-row">
//       {links}
//     </ul>
//   </div>
//   <div className="navbar-end">{user ? (
//   <div className="flex items-center gap-1 md:gap-2">
//     {user.photoURL && (
//       <div  className="relative inline-block"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}><img 
//         src={user.photoURL}
//         alt="User"
//         className="w-10 h-10 rounded-full border border-gray-300"
//       />
//         {isHovered && (
//         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-sm rounded">
//           {user.displayName}
//         </div>
//       )}
//    </div>
//     )}
//     <a onClick={handleSignOut} className="btn bg-orange-300">Sign Out</a>
//   </div>
// ) : (
//   <Link to="/login">
//     <button className="btn btn-secondary">Login</button>
//   </Link>
// )}
    
//   </div>
// </nav>
//     );
// };

// export default Navbar;