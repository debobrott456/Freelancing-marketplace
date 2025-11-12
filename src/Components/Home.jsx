import React from 'react';
import { useLoaderData } from 'react-router';

const Home = () => {
    const jobs=useLoaderData();
    console.log(jobs)
    return (
       <div className='m-5'><p className='text-center font-semibold text-3xl m-5'>Recent <span className='text-violet-500'>Jobs</span></p> <div className='grid grid-cols-3 gap-10'>
            { jobs.map(job=>(<div key={job.id} className='bg-gray-100 rounded-2xl p-5'><p className='mb-3 text-orange-300'>title:{job.title}</p>
            <img src={job.coverImage} alt="" style={{width:100 ,height:80}}/>
            <p>posted By :{job.postedBy}</p>
            <p>category: {job.category}</p>
            <p>email: {job.userEmail}</p>
            <button className="btn btn-outline btn-primary mt-4">accept task</button>
            </div>)) }
        </div></div>
    );
};

export default Home;