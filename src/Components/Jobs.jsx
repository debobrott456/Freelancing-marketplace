import React from 'react';
import { Link } from 'react-router';

const Jobs = ({job}) => {

    return (
        <div className='bg-white shadow-lg rounded-2xl p-5'><p className='mb-3 text-orange-300'>title:{job.title}</p>
            <img src={job.coverImage} alt="" className='rounded-xl' style={{width:100 ,height:80}}/>
            <p>posted By :{job.postedBy}</p>
            <p>category: {job.category}</p>
            <p>email: {job.userEmail}</p>
           <Link to={`/details/${job._id}`}>   <button className="btn btn-outline btn-primary mt-4">view details</button></Link>
            </div>
    );
};

export default Jobs;