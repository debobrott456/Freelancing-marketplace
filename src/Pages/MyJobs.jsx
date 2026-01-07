import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/Context';
import { Link } from 'react-router'; // Fixed import to standard router
import Swal from 'sweetalert2';
import { Edit3, Trash2, Briefcase, Mail, Tag, Calendar, Eye } from 'lucide-react';

const MyJobs = () => {
    const { user } = use(AuthContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            fetch(`https://3dserver.vercel.app/allJobsmy?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setJobs(data);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://3dserver.vercel.app/allJobs/${_id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        const remainingJobs = jobs.filter(job => job._id !== _id);
                        setJobs(remainingJobs);
                        Swal.fire("Deleted!", "Job post has been removed.", "success");
                    }
                });
            }
        });
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg text-amber-500"></span></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
            {/* Header & Stats */}
            <div className="max-w-6xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">
                            My <span className="text-amber-500">Jobs</span> Collection
                        </h1>
                        <p className="text-gray-500 mt-2 text-lg">Manage, track, and optimize your job postings.</p>
                    </div>
                    <div className="stats shadow bg-white border border-gray-100">
                        <div className="stat">
                            <div className="stat-title">Total Postings</div>
                            <div className="stat-value text-amber-500">{jobs.length}</div>
                            <div className="stat-desc">Across all categories</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Jobs List */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6">
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <div key={job._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                            {/* Image Section */}
                            <div className="relative w-full md:w-72 h-48 md:h-auto overflow-hidden">
                                <img 
                                    src={job.coverImage} 
                                    alt={job.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 left-2">
                                    <span className="badge badge-secondary bg-amber-500 border-none text-white font-semibold">
                                        {job.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-bold text-gray-800 hover:text-amber-600 transition-colors cursor-pointer">
                                            {job.title}
                                        </h3>
                                        <div className="flex gap-2">
                                            <Link to={`/dashboard/update/${job._id}`} className="btn btn-sm btn-ghost bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white">
                                                <Edit3 size={16} />
                                            </Link>
                                            <button onClick={() => handleDelete(job._id)} className="btn btn-sm btn-ghost bg-red-50 text-red-600 hover:bg-red-600 hover:text-white">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 mt-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Briefcase size={14} className="text-amber-500" />
                                            <span className="font-medium">By: {job.postedBy}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail size={14} className="text-amber-500" />
                                            <span>{job.userEmail}</span>
                                        </div>
                                        <div className="flex items-center gap-2 md:col-span-2">
                                            <Tag size={14} className="text-amber-500" />
                                            <p className="line-clamp-2 italic">"{job.summary || job.summury}"</p>
                                        </div>
                                        <div> <p className="line-clamp-2 italic font-semibold">{job.budjet} $</p></div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <Calendar size={12} /> Posted: {new Date(job.created_At).toLocaleDateString()}
                                    </span>
                                    <Link to={`/details/${job._id}`} className="text-amber-600 font-bold flex items-center gap-1 hover:underline">
                                        View Details <Eye size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-inner border-2 border-dashed border-gray-200">
                        <p className="text-2xl text-gray-400 font-semibold">No jobs found.</p>
                        <Link to="/addJob" className="btn btn-amber mt-4 bg-amber-500 text-white border-none">Create Your First Post</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyJobs;
