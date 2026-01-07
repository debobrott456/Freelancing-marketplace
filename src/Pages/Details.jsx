import {  useParams } from "react-router";
import { use, useEffect, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { DiCodeigniter, DiUikit } from "react-icons/di";
import { AiOutlineLineChart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaArrowRight, FaMale, FaMapMarkerAlt, FaRegClock, FaStar, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../Contexts/Context";
import { MapPin, Server, UserRound } from "lucide-react";
import { Star } from "lucide-react";
import Rating from "./Rating";

const JobDetails = () => {
const [reviewText, setReviewText] = useState("");
const [rating, setRating] = useState(0);
const [hover, setHover] = useState(0);

const handleReviewSubmit = async (e) => {
  e.preventDefault();
  
  if (rating === 0) return toast.error("Please select a star rating");

  const reviewData = {
    jobId: id,
    userName: user?.displayName,
    userEmail: user?.email,
    userPhoto: user?.photoURL,
    rating: rating,
    comment: reviewText,
    date: new Date().toISOString()
  };

  try {
    const res = await axiosSecure.post("/reviews", reviewData);
    if (res.data.insertedId) {
      toast.success("Review posted successfully!");
      setReviewText("");
      setRating(0);
      // Optional: Refresh job data to show new rating
    }
  } catch (err) {
    toast.error("Failed to post review");
    console.error(err);
  }
};
  const {user}=use(AuthContext)
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();

  const [job, setJob] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosSecure.get(`https://3dserver.vercel.app/allJobs/${id}`);
        setJob(res.data);
        setLoading(false)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [axiosSecure, id]);
  
const [messageData, setMessageData] = useState({ name: "", email: "", text: "" });

const handleSendMessage = async (e) => {
  e.preventDefault();

  const payload = {
    ...messageData,
    recipientEmail: job?.userEmail, // Sending to the freelancer who posted the job
    senderEmail: user?.email,      // The currently logged-in user
    jobTitle: job?.title,
    sentAt: new Date().toISOString(),
  };

  try {
    const res = await axiosSecure.post("/messages", payload);
    if (res.data.insertedId) {
      toast.success("Message sent to " + job.postedBy);
      setMessageData({ name: "", email: "", text: "" }); // Reset form
    }
  } catch (err) {
    toast.error("Could not send message");
    console.error(err);
  }
};

const handleButton =async()=>{
  job.status='accepted';
  job.orderEmail=user.email
  job.activetab={activeTab};
     try {
  const res = await axiosSecure.post("/orders", job);

  toast.success("Order created successfully!");

  console.log(res.data);

} catch (err) {
  toast.error("Failed to create order");
  console.error(err);
}
}


    if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg text-amber-500"></span></div>;
  if (!job) return <p>Job not found</p>;

  const pkg = job.packages[activeTab];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-[#f8f9fa] text-[#747272]">
      {/* LEFT CONTENT */}
      <div className="lg:col-span-2 bg-white p-3 rounded-xl">
        <img
          src={job.coverImage}
          alt={job.title}
          className="rounded-xl w-full h-120"
        />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">{job.title}</h1>
        <p className="text-gray-600 mt-2 whitespace-pre-line">
          {job.description}
        </p>

        {/* SKILLS */}
        <div className="flex flex-wrap gap-2 mt-4">
          {job.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-[#fceff2] rounded-full text-[#d795a4] text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT PACKAGE CARD */}
      <div className=" rounded-xl p-4 bg-white">
        {/* TABS */}
        <div className="flex justify-between border-b mb-4 ">
          {["basic", "standard", "premium"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-semibold ${
                activeTab === tab
                  ? " text-orange-500"
                  : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* PACKAGE CONTENT */}
      <div className="flex gap-3">
         <div className="text-3xl text-red-400"> <DiCodeigniter /></div>
        <h3 className="text-lg text-gray-900 font-bold">{pkg.name}</h3>
      </div>
        <p className="text-2xl font-bold my-4">${pkg.price}</p>

        <ul className="space-y-4 text-sm">
          {pkg.features.map((feature, i) => (
            <li className="flex gap-1" key={i}>
              <span className="bg-green-100 rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg></span>

             <span> {feature}</span> </li>
          ))}
        </ul>

        <div className="bg-[#f3dbd6] p-3 rounded-lg my-6">
           Delivery time: <b>{pkg.delivery}</b>
        </div>    
        {job.userEmail!=user.email?<button onClick={handleButton}   className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2"
>
        Accept Task
      </button>:<button className="btn btn-outline">Thanks</button>}
         <div className="grid grid-cols-3 p-2 border-1 my-8 rounded border-gray-300 ">
              <div className="p-4 flex flex-col items-center ">
                <HiOutlineShoppingBag className="text-emerald-500 text-3xl mb-1" />
                <span className="font-bold text-sm">1</span>
                <span className="text-[10px] text-gray-400 text-center uppercase font-bold tracking-tighter">No. of sales</span>
              </div>
              <div className="p-4 flex flex-col items-center ">
                <AiOutlineLineChart className="text-orange-500 text-3xl mb-1" />
                <span className="font-bold text-sm">35%</span>
                <span className="text-[10px] text-orange-400 text-center uppercase font-bold tracking-tighter">User rating</span>
              </div>
              <div className="p-4 flex flex-col items-center">
                <FaRegClock className="text-emerald-500 text-3xl mb-1" />
                <span className="font-bold text-sm">{pkg?.delivery}</span>
                <span className="text-[10px] text-gray-400 text-center uppercase font-bold tracking-tighter">Delivery</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
           <div className="flex gap-5 text-3xl "><UserRound />  <p>{job.postedBy}</p></div>
              <p className="ml-11">{job.title}</p>
                  <div className="flex gap-5 text-3xl"><Server /> <p>{job.category}</p></div>
                  <div className="flex gap-5 text-3xl"><MapPin /> <p>{job.location}</p></div>
              {/* <p>{pkg.tag}</p> */}
            </div>
      </div>
{/* REVIEW SECTION */}
<div className="bg-white rounded-xl shadow-sm p-6 border-gray-200 mt-8">
  <h3 className="text-xl font-bold text-gray-800 mb-6">Leave a Review</h3>
  
  <form onSubmit={handleReviewSubmit} className="space-y-4">
    {/* Star Rating Selector */}
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-600">Your Rating</span>
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              type="button"
              key={starValue}
              className={`text-2xl transition-colors ${
                starValue <= (hover || rating) ? "text-orange-500" : "text-gray-300"
              }`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              <FaStar />
            </button>
          );
        })}
      </div>
    </div>

    {/* Textarea */}
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-600">Your Feedback</span>
      <textarea
        required
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Share your experience with this service..."
        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none min-h-[120px] transition-all"
      />
    </div>

    <button
      type="submit"
      className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg"
    >
      Submit Review
    </button>
  </form>

  {/* Display Visual Statistics (Matching your image_c75fc3.png) */}
  <div className="mt-10 pt-10 border-t grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div className="text-center md:text-left">
      <h4 className="text-5xl font-bold text-gray-900">{job.rating || "5.0"}<span className="text-xl text-gray-400">/5</span></h4>
      <p className="text-gray-500 mt-1">Total Reviews</p>
      <div className="flex justify-center md:justify-start gap-1 mt-2 text-orange-500">
        {/* {[...Array(5)].map((_, i) => <FaStar key={i} />)} */}
        <Rating rating={job.rating}></Rating>
      </div>
    </div>
    
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((num) => (
        <div key={num} className="flex items-center gap-4 text-sm">
          <span className="w-4 font-bold">{num}★</span>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gray-800" 
              style={{ width: num === 5 ? '100%' : '0%' }} // You can calculate actual % here
            />
          </div>
          <span className="text-gray-400">1</span>
        </div>
      ))}
    </div>
  
  </div>

</div >
  <div className="bg-white rounded-xl shadow-sm border ml-28 border-gray-200 mt-8  overflow-hidden w-[700px] h-[470px]">
  <div className="grid grid-cols-1 md:grid-cols-3">
    
    {/* Contact Sidebar */}
    <div className="bg-gray-900 p-8 text-white">
      <h3 className="text-2xl font-bold mb-4 text-gray-900">Contact {job?.postedBy}</h3>
      <p className="text-gray-400 text-sm mb-8">
        Have a custom requirement or a question about the {activeTab} package? Send a direct message.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center">
            <FaMapMarkerAlt />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold">Location</p>
            <p className="text-sm">{job?.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
            <FaRegClock />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold">Typical Response</p>
            <p className="text-sm">Within 24 Hours</p>
          </div>
        </div>
      </div>
    </div>

    {/* Message Form */}
    <div className="md:col-span-2 p-8">
      <form onSubmit={handleSendMessage} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Your Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={messageData.name}
              onChange={(e) => setMessageData({ ...messageData, name: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Your Email</label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              value={user?.email}
              onChange={(e) => setMessageData({ ...messageData, email: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
          <textarea
            required
            rows="4"
            placeholder="Describe your project or ask a question..."
            value={messageData.text}
            onChange={(e) => setMessageData({ ...messageData, text: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2"
        >
          Send Message <FaArrowRight className="text-sm" />
        </button>
      </form>
    </div>
  </div>
</div>


       <ToastContainer/>

    </div>
  );
};

export default JobDetails;


// import React, {  useEffect, useState } from 'react';
// import { FaStar, FaMapMarkerAlt, FaRegClock, FaCheckCircle, FaArrowRight } from "react-icons/fa";
// import { MdOutlineCompareArrows } from "react-icons/md";
// import { HiOutlineShoppingBag } from "react-icons/hi";
// import { AiOutlineLineChart } from "react-icons/ai";
// import { AuthContext } from '../Contexts/Context';
// import { useParams } from 'react-router';

// const Details = () => {
//   // 1. Manage state for the selected package tab
//     const [job, setJob] = useState(null);
// // const [activeTab, setActiveTab] = useState('basic');
  
//   // 3. Conditional job Access
//   // Using optional chaining (?.) and a fallback empty object prevents the crash


//     const { id } = useParams();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`https://3dserver.vercel.app/allJobs/${id}`)
//       .then((res) => res.json())
//       .then((job) =>
//          {console.log(job)
//         // if your API returns an array (from toArray())
//         setJob( job);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching job details:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   //   const currentPackage = job.packages?.[activeTab] || { 
//   //   name: "Loading...", 
//   //   price: 0, 
//   //   delivery: "N/A", 
//   //   features: [] 
//   // };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!job) return <p className="text-center mt-10">Job not found.</p>;

//   return ( 
//     <div></div>
    
//   //   <div className="max-w-7xl mx-auto p-4 lg:p-8 bg-gray-50 min-h-screen">
//   //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//   //       {/* LEFT COLUMN: Image, Description, Skills */}
//   //       <div className="lg:col-span-2 space-y-6">
//   //         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//   //           <img 
//   //             src={job?.coverImage} 
//   //             alt={job?.title} 
//   //             className="w-full h-[400px] object-cover bg-gray-200" 
//   //           />
            
//   //           <div className="p-6 space-y-6">
//   //             <h1 className="text-3xl font-bold text-gray-800">{job?.title}</h1>
              
//   //             <div className="flex items-center gap-4 text-gray-600">
//   //               <div className="flex items-center gap-1">
//   //                 <FaStar className="text-yellow-400" />
//   //                 <span className="font-bold text-gray-800">{job?.rating}</span>
//   //                 <span>(Reviews)</span>
//   //               </div>
//   //               <div className="flex items-center gap-1 border-l pl-4">
//   //                 <FaMapMarkerAlt className="text-gray-400" />
//   //                 <span>{job?.location}</span>
//   //               </div>
//   //             </div>

//   //             <div className="border-t pt-6">
//   //               <h3 className="text-xl font-bold mb-4">Service Description</h3>
//   //               <p className="text-gray-600 leading-relaxed whitespace-pre-line">
//   //                 {job?.description}
//   //               </p>
//   //             </div>

//   //             {/* Skills Section */}
//   //             <div className="space-y-3">
//   //               <h3 className="font-bold text-gray-800">Skills:</h3>
//   //               <div className="flex flex-wrap gap-2">
//   //                 {job?.skills?.map(skill => (
//   //                   <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
//   //                     {skill}
//   //                   </span>
//   //                 ))}
//   //               </div>
//   //             </div>

//   //             {/* Tags Section */}
//   //             <div className="flex items-center gap-2 pt-4 border-t">
//   //               <span className="font-bold text-sm text-gray-700">Tags:</span>
//   //               <div className="flex flex-wrap gap-2">
//   //                 {job?.tags?.map(tag => (
//   //                   <span key={tag} className="text-xs text-gray-500 hover:text-orange-500 cursor-pointer">
//   //                     #{tag}
//   //                   </span>
//   //                 ))}
//   //               </div>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>

//   //       {/* RIGHT COLUMN: Package Selector */}
//   //       <div className="space-y-6">
//   //         <div className="bg-white rounded-xl shadow-sm border sticky top-6">
//   //           <div className="flex border-b">
//   //             {['basic', 'standard', 'premium'].map((tab) => (
//   //               <button
//   //                 key={tab}
//   //                 onClick={() => setActiveTab(tab)}
//   //                 className={`flex-1 py-4 text-sm font-bold capitalize transition-all ${
//   //                   activeTab === tab 
//   //                   ? "border-b-2 border-orange-600 text-orange-600" 
//   //                   : "text-gray-500 hover:text-gray-700"
//   //                 }`}
//   //               >
//   //                 {tab}
//   //               </button>
//   //             ))}
//   //           </div>

//   //           <div className="p-6 space-y-6">
//   //             <div className="flex justify-between items-center">
//   //               <h3 className="text-lg font-bold text-gray-700">{currentPackage?.name}</h3>
//   //               <span className="text-2xl font-bold text-gray-900">${currentPackage?.price}</span>
//   //             </div>

//   //             <ul className="space-y-3">
//   //               {currentPackage?.features?.map((feature, index) => (
//   //                 <li key={index} className="flex items-center gap-3 text-gray-600 text-sm">
//   //                   <FaCheckCircle className="text-green-500 flex-shrink-0" />
//   //                   <span>{feature}</span>
//   //                 </li>
//   //               ))}
//   //             </ul>

//   //             <div className="bg-green-50 p-3 rounded-full flex items-center justify-between">
//   //               <div className="flex items-center gap-2 text-green-700 text-sm font-semibold">
//   //                 <FaRegClock />
//   //                 <span>Delivery time</span>
//   //               </div>
//   //               <span className="text-gray-700 text-sm font-medium">{currentPackage?.delivery}</span>
//   //             </div>

//   //             <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-200">
//   //               Hire me for a task <FaArrowRight />
//   //             </button>

//   //             <button className="w-full border border-gray-200 py-3 rounded-xl font-semibold text-gray-500 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
//   //               Compare packages <MdOutlineCompareArrows className="text-xl" />
//   //             </button>
//   //           </div>

//   //           {/* Stats Footer */}
          
//   //         </div>
//   //       </div>
//   //     </div>
  

    
//   );
// };

// export default Details;

// import React, { use, useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AuthContext } from "../Contexts/Context";

// const Details = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//  const {user}=use(AuthContext)

//   useEffect(() => {
//     fetch(`https://3dserver.vercel.app/allJobs/${id}`)
//       .then((res) => res.json())
//       .then((job) => {console.log(job)
//         // if your API returns an array (from toArray())
//         setJob( job);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching job details:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleAccept = () => {
    
//     if (!job) return;

//     // Get old accepted jobs from localStorage
//     const stored = JSON.parse(localStorage.getItem("acceptedTasks")) || [];

//     // Check if already accepted
//     const exists = stored.find((item) => item._id === job._id);
//     if (exists) {
//       toast.success("You already accepted this task!");
//       return;
//     }

//     // Save new one
//     stored.push(job);
//     localStorage.setItem("acceptedTasks", JSON.stringify(stored));

//      toast.success('job has accepted successful!'); 
    
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!job) return <p className="text-center mt-10">Job not found.</p>;

//   return (
//     <div className="p-7"><p className="text-3xl font-semibold">Job Details</p>
//     <p className="text-3xl font-semibold">Explore Job and You can accept the Job</p>
//     <div className="m-5 md:mx-20 w-300 rounded-2xl p-5   flex gap-30">
      
//       <img
//         src={job.coverImage}
//         alt=""
//         style={{ width: 500, height: 300 }}
//         className="rounded-2xl"
//       />
//        <div>
//         <p className="mb-3 text-orange-300 text-center">Title: {job.title}</p>
//       <p className="p-2">Posted By: {job.postedBy}</p>
//       <p className="p-2 text-red-300">Category: {job.category}</p>
//       <p className="p-2">Email: {job.userEmail}</p>
//       <p className="p-2">Summary: {job.summary}</p>
//       <p className="p-2">Summary: {job.budjet} $</p>
      
//     {job.userEmail!=user.email?<button onClick={handleAccept} className="btn btn-outline  bg-orange-300 m-4">
//         Accept Task
//       </button>:<button className="btn btn-outline">Thanks</button>}
//        </div> 
    
//       </div>
//         <div className="w-3/4">
//         {job.description}
//        </div>
//       <ToastContainer/>
//     </div>
    
//   );
// };

// export default Details;
