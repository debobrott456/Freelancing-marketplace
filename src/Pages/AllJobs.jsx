import React, { useEffect, useState } from 'react';
import { Link, useLocation} from 'react-router';
import Jobs from '../Components/Jobs';
import ServiceCard from './ServiceCard';


const AllJobs = () => {

  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
 const [loading, setLoading] = useState(true);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  // Fetch jobs
  useEffect(() => {
    fetch(`https://3dserver.vercel.app/allJobs?sort=${sortOrder}`)
      .then(res => res.json())
      .then(data => {
        setAllJobs(data);
        setLoading(false);
      });
  }, [sortOrder]);
  

  // Apply category + search filters
  useEffect(() => {
    let filteredJobs = [...allJobs];

    // Category filter
    if (category) {
      filteredJobs = filteredJobs.filter(
        job => job.category === category
      );
    }

    // Search filter
    if (search.trim()) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setJobs(filteredJobs);
  }, [allJobs, category, search]);
      if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg text-amber-500"></span></div>;


  return (
    <>
    
      {/* Search input */}
      
      <label className="input m-5">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" required 
   placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}/>
</label>

      {/* Sort dropdown */}
     <span className='m-5'> <select className='bg-white'
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option  className='bg-white' value="desc">Recent listings</option>
        <option className='bg-white' value="asc">Oldest listings</option>
      </select></span>

      {/* Jobs count */}
      <p className='m-5 text-orange-400'>{jobs.length} Jobs found</p>

      {/* Cards */}
      <div className="service-grid">
        {jobs.map(job => (
          <ServiceCard key={job._id} item={job} />
        ))}
      </div>
    </>
  );
};

export default AllJobs;
//         <div>
      

//             <p className='text-4xl font-semibold text-center m-5'>All <span className='text-violet-500'>Jobs</span> Here</p>
//  <div className='flex items-center'>
//       <div className="navbar-center flex">
//     <ul className="menu menu-horizontal px-1">
     
//       <li>
//         <details>
//           <summary>Sort</summary>
//           <ul className="p-2">
//             <button onClick={() => setSortOrder('desc')}><li><a>recent</a></li></button>
//             <button onClick={() => setSortOrder('asc')}><li><a>previous</a></li></button>
//           </ul>
//         </details>
//       </li>
     
//     </ul>
//   </div>
//   <div className='border border-gray-300 rounded-xl w-[200px] h-7'>  <input value={search} onChange={e=>setSearch(e.target.value)} type="search"
//    name="search" id="" placeholder='search by title'/></div>
//  </div>
//         <div className='grid grid-cols-1 my-5 gap-2 md:grid md:grid-cols-3 md:gap-9 p-10'>
            
//        {filtered.length > 0 ? (
//           filtered.map(job => <Jobs key={job._id} job={job} />)
//         ) : (
//           <p className="col-span-4 text-center text-gray-500">
//             No App Found
//           </p>
//         )} </div>

//           {/* {
//             "https://rokbucket.rokomari.io/ProductNew20190903/260X372/cf7cb0607_149…"
//           } */}
//         </div>
//         // bh