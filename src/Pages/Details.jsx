import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    fetch(`http://localhost:5000/allJobs/${id}`)
      .then((res) => res.json())
      .then((data) => {console.log(data)
        // if your API returns an array (from toArray())
        setJob( data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAccept = () => {
    
    if (!job) return;

    // Get old accepted jobs from localStorage
    const stored = JSON.parse(localStorage.getItem("acceptedTasks")) || [];

    // Check if already accepted
    const exists = stored.find((item) => item._id === job._id);
    if (exists) {
      toast.success("You already accepted this task!");
      return;
    }

    // Save new one
    stored.push(job);
    localStorage.setItem("acceptedTasks", JSON.stringify(stored));

     toast.success('job has accepted successful!'); 
    
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center mt-10">Job not found.</p>;

  return (
    <div className="m-5 md:mx-20 max-w-150 rounded-2xl p-5 bg-white shadow-2xl ">
      <p className="mb-3 text-orange-300 text-center">Title: {job.title}</p>
      <img
        src={job.coverImage}
        alt=""
        style={{ width: 500, height: 400 }}
        className="rounded-2xl"
      />
      <p className="p-5">Posted By: {job.postedBy}</p>
      <p className="p-5 text-red-300">Category: {job.category}</p>
      <p className="p-5">Email: {job.userEmail}</p>
      <p className="p-5">Summary: {job.summary}</p>
      <button onClick={handleAccept} className="btn btn-outline btn-primary mt-4">
        Accept Task
      </button><ToastContainer/>
    </div>
  );
};

export default Details;
