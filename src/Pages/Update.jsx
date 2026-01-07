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
      fetch(`https://3dserver.vercel.app/allJobs/${id}`)
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

    fetch(`https://3dserver.vercel.app/allJobs/${id}`, {
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
 <div className="min-h-screen bg-slate-50 py-12 flex justify-center items-center px-4">
  <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
    {/* Header Decoration */}
    <div className="bg-amber-500 h-2 w-full"></div>
    
    <div className="p-8 md:p-12">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-black text-slate-800">Update Gig Details</h2>
        <p className="text-slate-500 mt-2">Modify the information below to keep your job posting accurate.</p>
      </header>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          
          {/* Job Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Job Title</label>
            <input
              type="text"
              name="title"
              defaultValue={job.title}
              placeholder="e.g. Senior Backend Developer"
              className="input input-bordered w-full focus:ring-2 focus:ring-amber-500 transition-all"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={job.category}
              placeholder="e.g. Web Development"
              className="input input-bordered w-full focus:ring-2 focus:ring-amber-500 transition-all"
              required
            />
          </div>

          {/* Summary / Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Summary</label>
            <textarea
              name="summury"
              defaultValue={job.summury || job.summary}
              placeholder="Briefly describe the role..."
              className="textarea textarea-bordered w-full h-28 focus:ring-2 focus:ring-amber-500 transition-all"
              required
            />
          </div>

          {/* Cover Image */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Cover Image URL</label>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="coverImage"
                defaultValue={job.coverImage}
                placeholder="https://..."
                className="input input-bordered w-full focus:ring-2 focus:ring-amber-500 transition-all text-sm text-blue-600 underline"
                required
              />
              {job.coverImage && (
                <div className="relative w-full h-24 rounded-xl overflow-hidden border border-slate-200">
                   <img src={job.coverImage} alt="Preview" className="w-full h-full object-cover opacity-60" />
                   <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <span className="text-[10px] uppercase font-bold text-white bg-black/40 px-2 py-1 rounded">Current Image Preview</span>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <button 
            type="submit" 
            className="btn bg-amber-500 hover:bg-amber-600 border-none text-white font-bold flex-1 rounded-xl shadow-lg shadow-amber-200/50"
          >
            Save Changes
          </button>
          <button 
            type="button" 
            onClick={() => window.history.back()}
            className="btn btn-outline border-slate-300 text-slate-500 hover:bg-slate-50 hover:text-slate-800 flex-1 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
  <ToastContainer position="top-right" />
</div>
  );
};

export default Update;
