import React from 'react';
import { Link } from 'react-router';
import { 
  Code2, 
  LayoutList, 
  BadgePercent, 
  Languages, 
  Cpu, 
  HeartPulse, 
  MapPin 
} from 'lucide-react';

const categories = [
  {
    title: "Web Development",
    description: "Software Developer, Data Analyst, Network Engineer",
    icon: <Code2 size={32} className="text-yellow-500" />,
    link: "/programming-tech"
  },
  {
    title: "Admin + Project Management",
    description: "Administrative Assistant, Project Manager, and Process Analyst",
    icon: <LayoutList size={32} className="text-blue-500" />,
    link: "/admin-management"
  },
  {
    title: "Digital Marketing",
    description: "Email Marketer, SEO Specialist, and a Web Developer.",
    icon: <BadgePercent size={32} className="text-gray-400" />,
    link: "/marketing-sales"
  },
  {
    title: "Writing & Translation",
    description: "Proofreader, Senior Editor, Creative Support",
    icon: <Languages size={32} className="text-yellow-600" />,
    link: "/writing-translation"
  },
  {
    title: "AI Services",
    description: "Machine Learning Engineer, AI Consultant, Data Scientist",
    icon: <Cpu size={32} className="text-yellow-500" />,
    link: "/ai-services"
  },
  {
    title: "Graphics Designing",
    description: "Make graphics card, bussiness card, and template",
    icon: <HeartPulse size={32} className="text-blue-400" />,
    link: "/music-audio"
  },
  {
    title: "Remote Work",
    description: "Customer Service Representative, Financial Analyst",
    icon: <MapPin size={32} className="text-yellow-500" />,
    link: "/remote-work"
  }
];

const CategoryGrid = () => {
  return (
    <div className="max-w-7xl mx-auto p-12 font-sans">
       <h3 className="text-3xl m-5 text-center font-bold ">
      Top <span className="text-violet-500">Categories</span>
    </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Dynamic Category Cards */}
        {categories.map((item, index) => (
          <Link 
            key={index} 
            to={`/allJobs?category=${item.title}`}
            className="group flex flex-col items-center text-center p-10 bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-blue-200"
          >
            <div className="mb-6">
              {item.icon}
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
              {item.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {item.description}
            </p>
          </Link>
        ))}

        {/* Special "Explore Categories" Card */}
        <div className="flex flex-col items-center justify-center text-center p-10 bg-orange-50 rounded-xl border border-transparent">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Explore Categories
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            More categories with lots of talent available to explore here.
          </p>
          <Link 
            to="/allJobs"
            className="bg-[#ee6c4d] hover:bg-amber-500 text-white font-bold py-3 px-8 rounded-xl transition-colors duration-200 shadow-sm"
          >
            Show All
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CategoryGrid;