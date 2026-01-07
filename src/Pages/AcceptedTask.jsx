import React, { use } from "react";
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/Context';
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";

const AcceptedTasks = () => {
    // const books=useLoaderData()
    // console.log(books)
    const {user}=use(AuthContext)
     const axiosSecure = UseAxiosSecure(); // if you use axiosSecure
 const {data:jobs=[],refetch}=useQuery({
        queryKey:['books',user?.email],
        queryFn:async ()=>{
            const res=await axiosSecure.get(`/orders?email=${user.email}`);
            console.log(res.data)
            return res.data;
        }
    })
console.log(jobs)
 const handleDelete=(id)=>{
          console.log(id);
          Swal.fire({
          title: "Are you sure?",
          text: "This will be parmanently removed!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!"
        }).then((result) => {
          if (result.isConfirmed) {
            
            axiosSecure.delete(`/myJobs/${id}`)
            .then(res=>console.log(res))
            refetch()
            Swal.fire({
              title: "Removed!",
              text: "book has been removed.",
              icon: "success"
            });
          }
        });
            }
//   const [accepted, setAccepted] = useState([]);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("acceptedTasks")) || [];
//     setAccepted(stored);
//   }, []);
//   console.log(accepted)
//  const handleRemove = (id, action) => {
//     const updated = accepted.filter((task) => task._id !== id);
//     setAccepted(updated);
//     localStorage.setItem("acceptedTasks", JSON.stringify(updated));

//     // Toast message based on action
//     if (action === "done") toast.success("Task marked as done ");
//     else toast.success("Task cancelled ");
//   };
//   if (accepted.length === 0)
//     return <p className="text-center mt-10">No accepted tasks yet.</p>;

  return (
 <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-10">
  <div className="max-w-7xl mx-auto">
    {/* Header Section */}
    <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">
          Accepted <span className="text-amber-500">Tasks</span>
        </h2>
        <p className="text-gray-500 font-medium">Manage and track your ongoing freelance commitments.</p>
      </div>
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm font-bold text-gray-700">{jobs.length} Active Projects</span>
      </div>
    </header>

    {/* Grid Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {jobs.map((job) => (
        <div key={job._id} className="bg-white w-[700px]  rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
          
          {/* Image & Overlay */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={job.coverImage}
              alt={job.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-amber-600 text-xs font-black uppercase rounded-lg shadow-sm">
                {job.category}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{job.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-[10px] font-bold">
                  {job.postedBy?.[0] || 'C'}
                </div>
                <span className="font-semibold">Client: {job.postedBy}</span>
              </div>
              <p className="text-xs text-gray-400 italic truncate">{job.userEmail}</p>
            </div>

            <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed flex-1">
              {job.summary || "No specific summary provided for this task."}
            </p>

            {/* Progress Bar (Visual Polish) */}
            <div className="mb-6">
               <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase mb-1">
                 <span>Task Progress</span>
                 <span>In Progress</span>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-1.5">
                 <div className="bg-amber-500 h-1.5 rounded-full w-2/3"></div>
               </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
              <button
                onClick={() => handleDelete(job._id, "done")}
                className="flex-1 bg-slate-900 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Mark as Completed
              </button>
              <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Empty State */}
    {jobs.length === 0 && (
      <div className="text-center py-20">
        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">No tasks accepted yet</h3>
        <p className="text-gray-500">Go to the job board to find your next project!</p>
      </div>
    )}

    <ToastContainer />
  </div>
</div>
  );
};

export default AcceptedTasks;
 