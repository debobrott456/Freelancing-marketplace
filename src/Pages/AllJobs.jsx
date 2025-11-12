import React from 'react';
import { Link, useLoaderData } from 'react-router';

const AllJobs = () => {
    const jobs =useLoaderData();

    return (
        <div>
            <p className='text-4xl font-semibold text-center m-5'>All <span className='text-violet-500'>Jobs</span> Here</p>
            <div className='grid grid-cols-3 gap-10 m-10'>
                
               { jobs.map(job=>(<div className='bg-white shadow-lg rounded-2xl p-5'><p className='mb-3 text-orange-300'>title:{job.title}</p>
            <img src={job.coverImage} alt="" style={{width:100 ,height:80}}/>
            <p>posted By :{job.postedBy}</p>
            <p>category: {job.category}</p>
            <p>email: {job.userEmail}</p>
           <Link to={`/details/${job._id}`}>   <button className="btn btn-outline btn-primary mt-4">view details</button></Link>
            </div>)) }
            </div>
        </div>
    );
};

export default AllJobs;