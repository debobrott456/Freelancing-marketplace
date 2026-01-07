import React, { use, useEffect, useState } from 'react';
import "../Styles/Banner.css"
import { GoMoveToEnd } from "react-icons/go";
import { MdOutlineTimer } from 'react-icons/md';
import { CreditCard, UserStar } from 'lucide-react';
import trust from "../assets/Screenshot 2026-01-04 084807.png"
import BrandCarousel from './BrandCarousel';
import CategoryGrid from './CategoryGrid';
import BannerSlider from './BannerCarousel';
import BannerCarousel from './BannerCarousel';
import ServiceCard from '../Pages/ServiceCard';
import Rating from '../Pages/Rating';
import dev from "../assets/domenico-loia-hGV2TfOh0ns-unsplash.jpg"
import FAQ from '../Pages/FAQ';
import { toast } from 'react-toastify';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../Contexts/Context';
import { FaArrowRight, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import ContactInfoSection from './ContactInfoSection';
import MarketplaceFeatures from './MarketplaceFeatures';
const Home = () => {
    const {user}=use(AuthContext)
      const [jobs, setJobs] = useState([]);
      const [loading, setLoading] = useState(true);
  
      useEffect(() => {
          
              setLoading(true);
              fetch(`https://3dserver.vercel.app/recentJobs`)
                  .then(res => res.json())
                  .then(data => {
                      setJobs(data);
                      setLoading(false);
                  });
          
      }, []);
   console.log(jobs)
   const [messageData, setMessageData] = useState({ name: "", email: "", text: "" });
   const axiosSecure=UseAxiosSecure();
  
   const handleSendMessage = async (e) => {
     e.preventDefault();
 
     const payload = {
       ...messageData,
        // Sending to the freelancer who posted the job
       senderEmail: user?.email,      // The currently logged-in user
      
       sentAt: new Date().toISOString(),
     };
   
     try {
       const res = await axiosSecure.post("/messages", payload);
       if (res.data.insertedId) {
         toast.success("Message sent to Our Team" );
         setMessageData({ name: "", email: "", text: "" }); // Reset form
       }
     } catch (err) {
       toast.error("Could not send message");
       console.error(err);
     }
   };
       if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg text-amber-500"></span></div>;

    return (
    
 <div> 
   {/* <div className="banner-container m-10 rounded-2xl">
      <div className="banner-content p-4 md:p-7">
        <h1>Find Your Perfect Freelancer</h1>
        <p>Connect with top talent and get your projects done efficiently.</p>
        <button className="banner-button">Explore Freelancers</button>
      </div>
    </div> */}
    <BannerCarousel></BannerCarousel>
    {/* <div className='relative'>
      <img className='w-full h-[500px]' src={banner} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-center bg-black/40">
    <h1 className="text-xl font-bold">
      Find Your Perfect Freelancer
    </h1>
    <p className="mt-4 text-xl">
     Connect with top talent and get your projects done efficiently. <br />
     It helps businesses turn ideas into fast, modern, and scalable web applications.
    </p>
  </div>
    </div> */}
    <section>
      <BrandCarousel></BrandCarousel>
    </section>


<section>
  <MarketplaceFeatures></MarketplaceFeatures>
</section>
    {/* <section className="reliability-section ">
       <h3 className="text-3xl m-5 text-center font-bold ">
      MarketPlace <span className="text-violet-500">Features</span>
    </h3>
      <div className="reliability-content">
       
        <div className="features">
          <div className="feature justify-center">
            <div className='text-6xl flex justify-center'><MdOutlineTimer /></div>
            <h3>24/7 Uptime</h3>
            <p className=''>Always online to serve your needs anytime, anywhere.</p>
          </div>
          <div className="feature">
          <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",}}>
            <CreditCard size={64}/>
            </div>
            <h3>Secure Payments</h3>
            <p>Encrypted transactions to keep your data and money safe.</p>
          </div>
          <div className="feature">
            <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",}}>
            <UserStar  size={64}/>
            </div>
            <h3>Verified Experts</h3>
            <p>Every freelancer is verified for quality and trustworthiness.</p>
          </div>
        </div>
      </div>
    </section> */}

    <section>
      <CategoryGrid></CategoryGrid>
    </section>
    {/* <div className=' block md:w-full bg-base-200  p-5'> <h3 className='text-center '>Top <span className='text-violet-500'>Category</span></h3>
   <div className="flex flex-col md:flex-row gap-10 m-10">
     <Link to="/allJobs?category=Web Development"> <div  className='feature w-60 p-5 '><img src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" alt=""  style={{width:50, height:50}} />
      <p>Web Development</p>
      <GoMoveToEnd/></div></Link>
      <Link to="/allJobs?category=Digital Marketing"><div className='feature w-60 p-5 '><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1115" alt=""  style={{width:50, height:50}}/>
      <p>Digital Marketing</p><GoMoveToEnd/></div></Link>
      <Link to="/allJobs?category=Graphics Designing"> <div className='feature w-60 p-5 '><img src="https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=776" alt="" style={{width:50, height:50}} />
      <p>Graphics Designing</p><GoMoveToEnd/></div></Link>
     
     
    </div>
    </div> */}
    
    <section>
      <h3 className="text-3xl m-5 text-center font-bold ">
      Our <span className="text-violet-500">Growth</span>
    </h3>
      <div className='flex'>
        <div className='flex-1 rounded-xl'>
         <img className='w-full' src={trust} alt="" />
      </div>
      <div className='flex-1 p-5'>
        <p>We're expanding day by day </p><br />
<h3  className='text-[#c08578] mb-3'>Global Trust of 1 Million Businesses and Counting <br />
Connect with skilled professionals, streamline <br /> collaboration, and unlock success. </h3>
<p className='flex gap-1'>

<span className='rounded-full bg-gray-300'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg></span>
<span> Connect with pros collaborate better succeed faster</span> </p>
  <br />
<p className='flex gap-1'>

<span className='rounded-full bg-gray-300'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg></span>
<span>
   Redefine work Join now for a better experience </span> </p>
  <br />
<p className='flex gap-1'>

<span className='rounded-full bg-gray-300'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg></span>
<span> 
Streamline collaboration unlock success</span> </p>
  <br />
<p className='flex gap-1'>

<span className='rounded-full bg-gray-300'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg></span>
<span>
Join us redefine your work experience</span> </p>
  <br />

  




      </div>
      </div>
    </section>

      <div className=' bg-base-200 p-10 '><h3 className='text-center font-semibold  m-5'>Recent <span className='text-violet-500'>Jobs</span></h3>
       <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
            { jobs.map(job=>(<ServiceCard key={job._id} item={job}></ServiceCard>)) }
        </div></div>

   <section className='p-5 lg:p-10 bg-base-200'>
  {/* Added 'flex' class and responsive gap */}
  <div className='flex flex-col lg:flex-row items-center gap-10 lg:gap-20'>
    
    {/* Image Container */}
    <div className='w-full lg:flex-1'>
      <img 
        src={dev} 
        alt="Developer" 
        className='h-auto lg:h-142 w-full object-cover rounded-lg shadow-md' 
      />
    </div>

    {/* FAQ Container */}
    <div className='w-full lg:flex-1'>
      <FAQ />
    </div>
    
  </div>
</section>

        <section className='flex gap-10 bg-gray-50 p-5'>
            <div className="bg-white rounded-xl shadow-sm border flex-1 border-gray-200 mt-8 overflow-hidden w-[700px] h-[470px]">
            <div className="grid grid-cols-1 md:grid-cols-3">
              
              {/* Contact Sidebar */}
              <div className="bg-gray-900 p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Contact Our Team</h3>
                <p className="text-gray-400 text-sm mb-8">
                  Have a custom requirement or a question about the package? Send a direct message.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Location</p>
                      <p className="text-sm">Uttara , Dhaka</p>
                    </div>
                  </div>
          
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#c08578] flex items-center justify-center">
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
                 <div className='flex-1'><ContactInfoSection></ContactInfoSection></div> 

        </section>
 </div>




     
    );
};

export default Home;