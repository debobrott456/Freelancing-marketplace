// import React, { use } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AuthContext } from '../Contexts/Context';
// import { BriefcaseBusiness, LayoutGrid, Image as ImageIcon, Mail, User, FileText } from 'lucide-react';

// const AddJobs = () => {
//     const { user } = use(AuthContext);

//     const handleInput = (e) => {
//         e.preventDefault();
//         const title = e.target.title.value;
//         const postedBy = e.target.postedBy.value;
//         const category = e.target.category.value;
//         const summary = e.target.summary.value;
//         const coverImage = e.target.coverImage.value;
//         const userEmail = e.target.email.value;
//         const created_At = new Date();

//         const obj = { title, postedBy, category, summary, coverImage, userEmail, created_At };

        // fetch('https://3dserver.vercel.app/addJobs', {
        //     method: 'POST',
        //     headers: { 'content-type': 'application/json' },
        //     body: JSON.stringify(obj)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         toast.success('Job posted successfully!');
        //         console.log(data)
        //         e.target.reset();
        //     });
    // };

//     return (
//         <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//                 {/* Header Section */}
//                 <div className="text-center mb-10">
//                     <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//                         Post a New Job
//                     </h2>
//                     <p className="mt-4 text-lg text-gray-600">
//                         Fill in the details below to connect with the best freelancers.
//                     </p>
//                 </div>

//                 {/* Form Section */}
//                 <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
//                     <form onSubmit={handleInput} className="p-8">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
//                             {/* Job Title */}
//                             <div className="form-control">
//                                 <label className="label font-bold text-gray-700">Job Title</label>
//                                 <div className="relative">
//                                     <BriefcaseBusiness className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                                     <input type="text" name="title" placeholder="e.g. Senior React Developer" className="input input-bordered w-full pl-10 focus:border-amber-500" required />
//                                 </div>
//                             </div>

//                             {/* Category */}
//                             <div className="form-control">
//                                 <label className="label font-bold text-gray-700">Category</label>
//                                 <div className="relative">
//                                     <LayoutGrid className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                                     <input type="text" name="category" placeholder="e.g. Web Development" className="input input-bordered w-full pl-10" required />
//                                 </div>
//                             </div>

//                             {/* Posted By */}
//                             <div className="form-control">
//                                 <label className="label font-bold text-gray-700">Company / Name</label>
//                                 <div className="relative">
//                                     <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                                     <input type="text" name="postedBy" placeholder="Your brand name" className="input input-bordered w-full pl-10" required />
//                                 </div>
//                             </div>

//                             {/* Contact Email */}
//                             <div className="form-control">
//                                 <label className="label font-bold text-gray-700">Contact Email</label>
//                                 <div className="relative">
//                                     <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                                     <input type="email" name="email" defaultValue={user?.email} className="input input-bordered w-full pl-10 bg-gray-50" readOnly />
//                                 </div>
//                             </div>

//                             {/* Cover Image URL */}
//                             <div className="form-control md:col-span-2">
//                                 <label className="label font-bold text-gray-700">Cover Image URL</label>
//                                 <div className="relative">
//                                     <ImageIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                                     <input type="url" name="coverImage" placeholder="https://example.com/image.jpg" className="input input-bordered w-full pl-10" required />
//                                 </div>
//                             </div>

//                             {/* Summary / Description */}
//                             <div className="form-control md:col-span-2">
//                                 <label className="label font-bold text-gray-700">Job Summary</label>
//                                 <div className="relative">
//                                     <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                                     <textarea name="summary" placeholder="Describe the job responsibilities and requirements..." className="textarea textarea-bordered w-full pl-10 min-h-[120px] pt-3" required></textarea>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Submit Button */}
//                         <div className="mt-8">
//                             <button type="submit" className="btn btn-block bg-[#d34e2d] hover:bg-amber-600 border-none text-white text-lg font-bold shadow-lg transition-all duration-300">
//                                 Post Job Now
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             <ToastContainer position="top-right" autoClose={3000} />
//         </div>
//     );
// };

// export default AddJobs;

import React, { use } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Contexts/Context';
import { 
  BriefcaseBusiness, LayoutGrid, Image as ImageIcon, MapPin, 
  Clock, DollarSign, Layers, AlignLeft 
} from 'lucide-react';

const AddJobs = () => {
  const { user } = use(AuthContext);

  const handleInput = (e) => {
    e.preventDefault();
    const form = e.target;
    
    // Skill and Feature parsing logic
    const packages = {
      basic: {
        name: form.basicName.value,
        price: Number(form.basicPrice.value),
        delivery: form.basicDelivery.value,
        features: form.basicFeatures.value.split(',').map(f => f.trim())
      },
      standard: {
        name: form.standardName.value,
        price: Number(form.standardPrice.value),
        delivery: form.standardDelivery.value,
        features: form.standardFeatures.value.split(',').map(f => f.trim())
      },
      premium: {
        name: form.premiumName.value,
        price: Number(form.premiumPrice.value),
        delivery: form.premiumDelivery.value,
        features: form.premiumFeatures.value.split(',').map(f => f.trim())
      }
    };

    const obj = {
      title: form.title.value,
      postedBy: form.postedBy.value,
      category: form.category.value,
      location: form.location.value,
      budjet: Number(form.budjet.value),
      delivery_time: form.delivery_time.value,
      rating: 5,
      skills: form.skills.value.split(',').map(s => s.trim()),
      description: form.description.value,
      coverImage: form.coverImage.value,
      userEmail: user?.email,
      created_At: new Date(),
      packages
    };

    // Replace with your actual fetch logic
           fetch('https://3dserver.vercel.app/addJobs', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Job posted successfully!');
                console.log(data)
                e.target.reset();
            });
    console.log(obj);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-slate-800">Post New Service</h2>
          <p className="text-slate-500">All fields are standardized for a clean marketplace look.</p>
        </header>

        <form onSubmit={handleInput} className="space-y-6">
          
          {/* SECTION 1: CORE DETAILS */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-6 text-slate-700 flex items-center gap-2 border-b pb-4">
               <BriefcaseBusiness className="text-amber-500" size={20} /> Core Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600">Job Title</label>
                <input type="text" name="title" placeholder="e.g. UI/UX Designer" className="input input-bordered w-full" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600">Category</label>
                <input type="text" name="category" placeholder="Web Development" className="input input-bordered w-full" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600">Location</label>
                <input type="text" name="location" placeholder="Dhaka, Bangladesh" className="input input-bordered w-full" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600">Starting Budget ($)</label>
                <input type="number" name="budjet" placeholder="200" className="input input-bordered w-full" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600">Delivery Time</label>
                <input type="text" name="delivery_time" placeholder="e.g. 5 Days" className="input input-bordered w-full" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600">Skills (Comma separated)</label>
                <input type="text" name="skills" placeholder="React, Figma, Tailwind" className="input input-bordered w-full" required />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-3">
                <label className="text-sm font-bold text-slate-600">Cover Image URL</label>
                <input type="url" name="coverImage" placeholder="https://image-link.com" className="input input-bordered w-full" required />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-3">
                <label className="text-sm font-bold text-slate-600">Description</label>
                <textarea name="description" className="textarea textarea-bordered w-full h-32" placeholder="Write a detailed description..."></textarea>
              </div>
            </div>
          </div>

          {/* SECTION 2: PRICING TIERS */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-6 text-slate-700 flex items-center gap-2 border-b pb-4">
               <Layers className="text-amber-500" size={20} /> Pricing Packages
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Common Package Fields Grouped for Alignment */}
              {['basic', 'standard', 'premium'].map((tier) => (
                <div key={tier} className="flex flex-col gap-4 p-6 bg-white rounded-xl border border-slate-100">
                  <span className="uppercase text-xs font-black tracking-widest text-slate-400">{tier} Plan</span>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Package Name</label>
                    <input type="text" name={`${tier}Name`} className="input input-bordered input-sm w-full" placeholder="e.g. Silver Plan" required />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Price ($)</label>
                    <input type="number" name={`${tier}Price`} className="input input-bordered input-sm w-full" required />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Delivery</label>
                    <input type="text" name={`${tier}Delivery`} className="input input-bordered input-sm w-full" placeholder="e.g. 3 Days" required />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Features</label>
                    <textarea name={`${tier}Features`} className="textarea textarea-bordered textarea-sm w-full h-24" placeholder="Feature 1, Feature 2..."></textarea>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: SUBMIT */}
          <div className="flex items-center justify-between p-8 bg-slate-800 rounded-2xl">
            <div className="hidden md:block">
              <p className="text-slate-300 text-sm font-medium">Logged in as</p>
              <input type="text" name="postedBy" defaultValue={user?.displayName || "User"} className="bg-transparent text-white font-bold outline-none border-none pointer-events-none" />
            </div>
            <button type="submit" className="btn bg-[#d34e2d] hover:bg-amber-600 text-white border-none px-10 rounded-xl w-full md:w-auto">
              Post This Job
            </button>
          </div>

        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddJobs;