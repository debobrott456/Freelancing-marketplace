import React, { use } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Contexts/Context';
const AddJobs = () => {
const {user}=use(AuthContext);
    const handleInput=(e)=>{
    e.preventDefault();
    
    const title=e.target.title.value;
    const postedBy=e.target.postedBy.value;
    const category=e.target.category.value;
    const summury=e.target.summury.value;
    const coverImage=e.target.coverImage.value;
    const userEmail=e.target.email.value;
    const date=e.target.date.value;

    const obj={title,postedBy,category,summury,coverImage,userEmail,date}

    fetch('http://localhost:5000/addJobs',{
        method:'POST',
        headers: {
            'content-type':'application/json'
        },
        body:JSON.stringify(obj)
    })
    .then(res=>res.json())
    .then(data=>{console.log(data)
     toast.success('Job added successful!'); }
)
    e.target.reset()
     
    }
    return (
        <div className='flex flex-col justify-center items-center m-10 '>
              <p style={{ color: "orange", fontStyle: "italic" }} className='m-5'>
        Please fill in the job details carefully. Include a clear title, job description,<br />
        and expected budget so freelancers can understand your needs easily.
      </p>
            <form  onSubmit={handleInput} action=""><fieldset className="fieldset w-[600px] bg-white shadow-2xl border-base-300 rounded-box  border p-4">
                <label className="label  font-semibold">Title</label> <br />
                <input type="text" placeholder="Type here" name="title" className="input w-full" /> <br />
                <label className="label font-semibold">PostedBy</label> <br />
                    <input type="text" placeholder="Type here" name="postedBy" className="input w-full" /> <br />
                    <label className="label font-semibold">Category</label> <br />
                <input type="text" placeholder="Type here" name="category" className="input w-full" /> <br />
                <label className="label font-semibold">Summury</label> <br />
                <input type="text" placeholder="Type here" name="summury" className="input w-full" /> <br />
                <label className="label font-semibold">CoverImage</label> <br />
                <input type="text" placeholder="Type here" name="coverImage" className="input w-full" /> <br />
                <label className="label font-semibold">Email</label> <br />
                <input type="email" placeholder="Type here" name="email" defaultValue={user.email} className="input w-full" /> <br />
                <label className="label font-semibold">Date</label> <br />
                
                <input type="date" name="date" className="input w-full" />
                <button className="btn btn-outline btn-primary mt-4"><input type="submit" value="submit" /></button>
                </fieldset>
            </form><ToastContainer/>
        </div>
    );
};

export default AddJobs;