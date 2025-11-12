import React from 'react';

const AddJobs = () => {

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
    .then(data=>console.log(data))
    e.target.reset()
     
    }
    return (
        <div className='flex justify-center'>
            <form  onSubmit={handleInput} action=""><fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <label className="label  font-semibold">Title</label> <br />
                <input type="text" placeholder="Type here" name="title" className="input" /> <br />
                <label className="label font-semibold">PostedBy</label> <br />
                    <input type="text" placeholder="Type here" name="postedBy" className="input" /> <br />
                    <label className="label font-semibold">Category</label> <br />
                <input type="text" placeholder="Type here" name="category" className="input" /> <br />
                <label className="label font-semibold">Summury</label> <br />
                <input type="text" placeholder="Type here" name="summury" className="input" /> <br />
                <label className="label font-semibold">CoverImage</label> <br />
                <input type="text" placeholder="Type here" name="coverImage" className="input" /> <br />
                <label className="label font-semibold">Email</label> <br />
                <input type="email" placeholder="Type here" name="email" className="input" /> <br />
                <label className="label font-semibold">Date</label> <br />
                
                <input type="date" name="date" className="input" />
                <button className="btn btn-outline btn-primary mt-4"><input type="submit" value="submit" /></button>
                </fieldset>
            </form>
        </div>
    );
};

export default AddJobs;