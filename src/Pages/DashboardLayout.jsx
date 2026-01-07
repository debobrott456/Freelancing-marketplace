import { Link, Outlet } from "react-router";
import { BaggageClaim, Home, Settings } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { MdOutlineAddchart, MdOutlineWorkHistory } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaRegUserCircle, FaUserAlt } from "react-icons/fa";

const DashBoardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* The main dashboard area with Sidebar */}
      <div className="flex-grow"></div>
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 font-bold text-xl text-amber-600">Freelance Dashboard</div>
        </nav>

        {/* Page content here */}
        <div className="p-4 bg-slate-50 min-h-screen">
          <Outlet /> {/* This is where your nested pages like MyJobs will render */}
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 transition-all duration-300">
          
          <ul className="menu w-full grow gap-2 p-2">
            {/* Homepage */}
            <li>
              <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                <Home className="size-4" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* Add Jobs */}
            <li>
              <Link to='/dashboard/addJobs' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Jobs">
                <MdOutlineAddchart className="size-4 text-orange-500" />
                <span className="is-drawer-close:hidden">Add Jobs</span>
              </Link>
            </li>

            {/* My Jobs */}
            <li>
              <Link to='/dashboard/myjobs' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Jobs">
                <MdOutlineWorkHistory className="size-4 text-orange-500" />
                <span className="is-drawer-close:hidden text-nowrap">My Jobs</span>
              </Link>
            </li>

            {/* Accepted Jobs */}
            <li>
              <Link to='/dashboard/accepted' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Accepted Jobs">
                <AiOutlineFileDone className="size-4 text-orange-500" />
                <span className="is-drawer-close:hidden text-nowrap">Accepted Jobs</span>
              </Link>
            </li>
            <li>
              <Link to='/dashboard/profile' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                <FaRegUserCircle className="size-4 text-orange-500" />
                <span className="is-drawer-close:hidden text-nowrap">My Profile</span>
              </Link>
            </li>

            {/* Settings */}
            <li className="mt-auto">
              <Link to="/settings" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                <Settings className="size-4" />
                <span className="is-drawer-close:hidden">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    

      <Footer />
    </div>
  );
};

export default DashBoardLayout;