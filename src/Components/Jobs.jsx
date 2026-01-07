import React from 'react';
import { Link } from 'react-router';

const Jobs = ({job}) => {

    return (
        <div className='bg-white shadow rounded-2xl p-5'>
            <img src={job.coverImage} alt="" className='rounded-xl' style={{width:100 ,height:80}}/>
            <p className='mb-3 text-orange-300'>title:{job.title}</p>
            <p>posted By :{job.postedBy}</p>
            <p>category: {job.category}</p>
            <p>email: {job.userEmail}</p>
            <p>budjet : {job.budjet} $</p>
           <Link to={`/details/${job._id}`}>   <button className="btn btn-sm bg-orange-300 mt-4">view details</button></Link>
            </div>
    );
};

export default Jobs;