import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AcceptedTasks = () => {
  const [accepted, setAccepted] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("acceptedTasks")) || [];
    setAccepted(stored);
  }, []);
  console.log(accepted)
 const handleRemove = (id, action) => {
    const updated = accepted.filter((task) => task._id !== id);
    setAccepted(updated);
    localStorage.setItem("acceptedTasks", JSON.stringify(updated));

    // Toast message based on action
    if (action === "done") toast.success("Task marked as done ");
    else toast.success("Task cancelled ");
  };
  if (accepted.length === 0)
    return <p className="text-center mt-10">No accepted tasks yet.</p>;

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Accepted Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accepted.map((job) => (
          <div key={job._id} className="bg-white rounded-xl shadow-md p-5">
            <img
              src={job.coverImage}
              alt={job.title}
              className="rounded-lg mb-3 h-48 w-full object-cover"
            />
            <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
            <p className="text-gray-600 mb-1">Category: {job.category}</p>
            <p className="text-gray-600 mb-1">Posted by: {job.postedBy}</p>
            <p className="text-gray-600 mb-1">Email: {job.userEmail}</p>
            <p className="text-gray-500 mt-2">{job.summary}</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleRemove(job._id, "done")}
                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Done
              </button>
              <button
                onClick={() => handleRemove(job._id, "cancel")}
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div><ToastContainer/>
    </div>
  );
};

export default AcceptedTasks;
