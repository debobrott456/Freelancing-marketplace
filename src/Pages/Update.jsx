import React, { useEffect, useState} from 'react';

import { AuthContext } from '../Contexts/Context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router';

const Update = () => {
  const { id } = useParams(); // Get job._id from URL

  const [job, setJob] = useState(null); // single job

  // Fetch the job by ID
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/allJobs/${id}`)
        .then(res => res.json())
        .then(data => {
          setJob(data); // your GET by ID returns an array
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const category = e.target.category.value;
    const summury = e.target.summury.value;
    const coverImage = e.target.coverImage.value;

    const obj = { title, category, summury, coverImage };

    fetch(`http://localhost:5000/allJobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        toast.success('Job updated successfully!');
      })
      .catch(err => {
        console.error(err);
        toast.error('Update failed');
      });
  };

  if (!job) return <p>Loading job...</p>;

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body flex justify-center items-center">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                  <label className="label font-semibold">Title</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="title"
                    defaultValue={job.title}
                    className="input"
                  />

                  <label className="label font-semibold">Category</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="category"
                    defaultValue={job.category}
                    className="input"
                  />

                  <label className="label font-semibold">Summury</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="summury"
                    defaultValue={job.summury || job.summary} // fallback if your field is null
                    className="input"
                  />

                  <label className="label font-semibold">CoverImage</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="coverImage"
                    defaultValue={job.coverImage}
                    className="input"
                  />

                  <button className="btn btn-outline btn-primary mt-4" type="submit">
                    Update
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Update;
