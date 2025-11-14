import React, { useEffect, useState } from 'react';
import { Link, useLocation} from 'react-router';
import Jobs from '../Components/Jobs';

const AllJobs = () => {
//     const jobs =useLoaderData();
// console.log(jobs)
// const [jobs,setJobs]=useState([])

//   const [search,setSearch]=useState("")

//   const [sortOrder, setSortOrder] = useState('desc'); // default descending

// useEffect(() => {
//   fetch(`http://localhost:5000/allJobs?sort=${sortOrder}`)
//     .then(res => res.json())
//     .then(data => setJobs(data));
    
// }, [sortOrder]);

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const location = useLocation();

  // Read category from URL ?category=UI/UX Design
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  useEffect(() => {
    fetch(`http://localhost:5000/allJobs?sort=${sortOrder}`)
      .then(res => res.json())
      .then(data => {
        // Apply category filter if exists
        if (category) {
          const filteredByCategory = data.filter(job => job.category === category);
          setJobs(filteredByCategory);
        } else {
          setJobs(data);
        }
      });
  }, [sortOrder, category]);

  // Search filter
  const term = search.trim().toLowerCase();
  const filtered = term
    ? jobs.filter(app => app.title.toLowerCase().includes(term))
    : jobs;
    return (
        <div>
      

            <p className='text-4xl font-semibold text-center m-5'>All <span className='text-violet-500'>Jobs</span> Here</p>
 <div className='flex items-center'>
      <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     
      <li>
        <details>
          <summary>Sort</summary>
          <ul className="p-2">
            <button onClick={() => setSortOrder('desc')}><li><a>recent</a></li></button>
            <button onClick={() => setSortOrder('asc')}><li><a>previous</a></li></button>
          </ul>
        </details>
      </li>
     
    </ul>
  </div>
  <div className='border border-gray-300 rounded-xl w-[200px] h-7'>  <input value={search} onChange={e=>setSearch(e.target.value)} type="search"
   name="search" id="" placeholder='search by title'/></div>
 </div>
        <div className='grid grid-cols-1 my-5 gap-2 md:grid md:grid-cols-3 md:gap-9 p-10'>
            
       {filtered.length > 0 ? (
          filtered.map(job => <Jobs key={job._id} job={job} />)
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            No App Found
          </p>
        )} </div>

          
        </div>
        // bh
    );
};

export default AllJobs;