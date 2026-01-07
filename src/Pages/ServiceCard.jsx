import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import Rating from "./Rating";
import { Link } from "react-router";
import { MapPin } from "lucide-react";
       import { Heart } from 'lucide-react';

// ... inside your component
const ServiceCard = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
  
  {/* Image Container */}
  <div className="relative h-56 overflow-hidden">
    <img 
      src={item.coverImage} 
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
      alt={item.title}
    />
    
    {/* Floating Wishlist Heart */}
    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md flex justify-center items-center group/heart cursor-pointer hover:bg-white transition-all">
      <Heart 
        size={20} 
        className="text-red-500 fill-transparent group-hover/heart:fill-red-500 transition-colors duration-300" 
      />
    </div>
  </div>

  {/* Content */}
  <div className="p-6">
    {/* User/PostedBy */}
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-600">
        {item.postedBy?.[0] || 'U'}
      </div>
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.postedBy}</span>
      <FaCheckCircle className="text-green-500" size={12} />
    </div>

    {/* Title */}
    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-1 italic">
      {item.title}
    </h2>

    {/* Rating */}
    <div className="mb-4">
      <Rating rating={item.rating} />
    </div>

    {/* Location */}
    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-4">
      <MapPin size={16} />
      <span>{item.location || "Remote"}</span>
    </div>

    {/* Divider */}
    <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-800 mb-4"></div>

    {/* Footer: Price & Button */}
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Starting from</span>
        <strong className="text-xl text-gray-900 dark:text-white">${item.budjet}</strong>
      </div>
      
      <Link to={`/details/${item._id}`}>
        <button className="bg-[#d34e2d] hover:bg-slate-900 dark:hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 text-sm">
          View Details
        </button>
      </Link>
    </div>
  </div>
</div>
//     <div className="service-card">
//       {/* Image */}
//       <div className="card-image">
//         <img src={item.coverImage}  />
 
// <div className="w-12 h-12 bg-white rounded-full shadow-md wishlist flex justify-center items-center group cursor-pointer hover:shadow-lg transition-all">
//   <Heart 
//     size={24} 
//     className="text-red-500 fill-transparent group-hover:fill-red-500 transition-colors duration-300" 
//   />
// </div>
//       </div>

//       {/* Content */}
//       <div className="card-content">
//         {/* User */}
//         <div className="user">
//           {/* <img src={item.user.avatar} alt={item.user.name} /> */}
//           <span>{item.postedBy}</span>
//           {
//             <FaCheckCircle color="#22c55e" size={14} />
//           }
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl font-semibold">{item.title}</h2>

//         {/* Rating */}
//          <Rating rating={item.rating} />

//         {/* Location */}
//         <div className="location">
//           <MapPin  size={20} />
//           <span>{item.location}</span>
//         </div>

//         {/* Price */}
//         <div className="price">
//           <span className="font-semibold">Starting from</span>
//           <strong>${item.budjet}</strong>
//         </div>
//         <Link to={`/details/${item._id}`}> <button className="bg-[#d34e2d] hover:bg-black text-white px-8 py-3 btn btn-md rounded-xl font-bold transition-all shadow-lg"
// >view Details</button></Link>
//       </div>
//     </div>
  );
};

export default ServiceCard;
