import React from 'react';
import { useLoaderData } from 'react-router';
import "../Styles/Banner.css"

const Home = () => {
    const jobs=useLoaderData();
    console.log(jobs)
    return (
    
 <div> 
   <div className="banner-container m-10">
      <div className="banner-content">
        <h1>Find Your Perfect Freelancer</h1>
        <p>Connect with top talent and get your projects done efficiently.</p>
        <button className="banner-button">Explore Freelancers</button>
      </div>
    </div>
    <section className="reliability-section">
      <div className="reliability-content">
        <h2>Why You Can Trust Us</h2>
        <p>
          Our platform ensures 99.9% uptime, secure transactions, and verified
          freelancers. We prioritize reliability so you can focus on growing
          your business without any interruptions.
        </p>
        <div className="features">
          <div className="feature">
            <h3>24/7 Uptime</h3>
            <p>Always online to serve your needs anytime, anywhere.</p>
          </div>
          <div className="feature">
            <h3>Secure Payments</h3>
            <p>Encrypted transactions to keep your data and money safe.</p>
          </div>
          <div className="feature">
            <h3>Verified Experts</h3>
            <p>Every freelancer is verified for quality and trustworthiness.</p>
          </div>
        </div>
      </div>
    </section>
    <div> <p className='text-center text-3xl'>Top <span className='text-violet-400'>Category</span></p>
      <div className='flex gap-10 m-10'>
      <div className='w-100 p-5 '><img src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" alt="" />
      <p>Frontend developing</p></div>
      <div className='w-100 p-5 '><img src="https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=776" alt="" />
      <p>Digital Marketing</p></div>
      <div className='w-100 p-5 '><img src="https://images.unsplash.com/photo-1519408469771-2586093c3f14?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=702" alt="" />
      <p>Graphics Design</p></div>
      <div className='w-100 p-5 '><img src="https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=776" alt="" />
      <p>Full Stack developing</p></div>
      <div className='w-100 p-5 '><img src="https://images.unsplash.com/photo-1586717799252-bd134ad00e26?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" alt="" />
      <p>UI/UX Design</p></div>
    </div>
    </div>
      <div className='m-5'><p className='text-center font-semibold text-3xl m-5'>Recent <span className='text-violet-500'>Jobs</span></p> <div className='grid grid-cols-3 gap-10'>
            { jobs.map(job=>(<div key={job._id} className='bg-gray-100 rounded-2xl p-5'><p className='mb-3 text-orange-300'>title:{job.title}</p>
            <img src={job.coverImage} alt="" style={{width:100 ,height:80}} className='rounded-xl'/>
            <p>posted By :{job.postedBy}</p>
            <p>category: {job.category}</p>
            <p>email: {job.userEmail}</p>
            
            </div>)) }
        </div></div>
 </div>




     
    );
};

export default Home;