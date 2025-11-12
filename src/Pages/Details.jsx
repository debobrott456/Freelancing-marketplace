import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';


const Details = () => {

 
   const { id } = useParams(); // get id from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/allJobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // since your API returns an array (because of toArray()), take first element
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
        setLoading(false);
      });
  }, [id]);
  console.log(job)

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center mt-10">Job not found.</p>;

 
    return (
        <div>
          <div className='mx-20 max-w-150 rounded-2xl p-5 bg-white shadow-2xl m-10' ><p className='mb-3 text-orange-300'>title:{job.title}</p>
            <img src={job.coverImage} alt="" style={{width:500 ,height:400}} className='rounded-2xl'/>
            <p className='p-5'>posted By :{job.postedBy}</p>
            <p className='p-5 text-red-300'>category: {job.category}</p>
            <p className='p-5'>email: {job.userEmail}</p>
            <p className='p-5'>summary: {job.summary}</p>
             <button className="btn btn-outline btn-primary mt-4">accept task</button>
            </div>
        </div>
    );
};

export default Details;