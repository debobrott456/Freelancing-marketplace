import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/Context';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyJobs = () => {

    const {user }=use(AuthContext)
    const [jobs,setJobs]=useState([])
    
    useEffect(()=>{
        if(user?.email){
   fetch(`http://localhost:5000/allJobsmy?email=${user.email}`)
   .then(res=>res.json())
   .then(data=>{console.log(data)
   setJobs(data)}
)}
console.log(jobs)
    },[user?.email])

    const handleDelete=(_id)=>{
Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
fetch(`http://localhost:5000/allJobs/${_id}`,{
    method:'DELETE'
})
.then(res=>res.json())
.then(data=>{console.log(data)
if(data.deletedCount){
const remainingJobs=jobs.filter(job=>job._id!=_id)
setJobs(remainingJobs)
}}
)


    Swal.fire({
      title: "Deleted!",
      text: "Your job has been deleted.",
      icon: "success"
    });
  }
});
    }
    return (
       <div className='grid grid-cols-1 gap-10 max-w-[600px] m-10'>
        <p className='text-center font-semibold text-3xl m-5'>My <span className='text-violet-500'>Jobs</span></p>
            { jobs.map(job=>(<div className='bg-white shadow-lg rounded-2xl p-5 flex gap-5'>
            <img src={job.coverImage} alt="" style={{width:400 ,height:300}} className='rounded-2xl'/>
          <div>  <p className='mb-3 text-orange-300'>title:{job.title}</p>
            <p>posted By :{job.postedBy}</p>
            <p>category: {job.category}</p>
            <p>summury:{job.summury}</p>
            <p>email: {job.userEmail}</p>
            <Link to={`/update/${job._id}`}> <button className="btn btn-outline btn-primary mt-4">update</button></Link>
             <button onClick={()=>handleDelete(job._id)} className="btn btn-outline btn-primary mt-4">delete</button></div>
            </div>)) }
            </div>
    );
};

export default MyJobs;