import React, { use, useEffect, useState } from 'react';

import { AuthContext } from '../Contexts/Context';


const Update = () => {
 const {user }=use(AuthContext)
    const [jobs,setJobs]=useState([])
    
    useEffect(()=>{
        if(user?.email){
   fetch(`http://localhost:5000/allJobs?email=${user.email}`)
   .then(res=>res.json())
   .then(data=>{console.log(data)
   setJobs(data)}
)}

    },[user?.email])

  console.log(jobs)
 const handleUpdate=(e)=>{
    e.preventDefault();
    
    const title=e.target.title.value;
 
    const category=e.target.category.value;
    const summury=e.target.summury.value;
    const coverImage=e.target.coverImage.value;

    const obj={title,category,summury,coverImage}
    console.log(obj)
{jobs.map(job=>{ fetch(`http://localhost:5000/allJobs/${job._id}`,{
        method:'PATCH',
        headers: {
            'content-type':'application/json'
        },
        body:JSON.stringify(obj)
    })
    .then(res=>res.json())
    .then(data=>console.log(data))})}
   
    e.target.reset()
     
    }

    return (
        <div>
            <form onSubmit={handleUpdate} action=""><div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">

    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <label className="label  font-semibold">Title</label> <br />
                <input type="text" placeholder="Type here" name="title" className="input" /> <br />

                    <label className="label font-semibold">Category</label> <br />
                <input type="text" placeholder="Type here" name="category" className="input" /> <br />
                <label className="label font-semibold">Summury</label> <br />
                <input type="text" placeholder="Type here" name="summury" className="input" /> <br />
                <label className="label font-semibold">CoverImage</label> <br />
                <input type="text" placeholder="Type here" name="coverImage" className="input" /> <br />
               
           
                
                
                <button className="btn btn-outline btn-primary mt-4"><input type="submit" value="update" /></button>
                </fieldset>
            
     </div>
    </div>
  </div>
</div></form>
        </div>
    );
};

export default Update;