import React from 'react';
import { useLoaderData } from 'react-router';
import "../Styles/Banner.css"

const Home = () => {
    const jobs=useLoaderData();
    console.log(jobs)
    return (
    
 <div>  <div className="banner-container m-10">
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
      <div className='m-5'><p className='text-center font-semibold text-3xl m-5'>Recent <span className='text-violet-500'>Jobs</span></p> <div className='grid grid-cols-3 gap-10'>
            { jobs.map(job=>(<div key={job.id} className='bg-gray-100 rounded-2xl p-5'><p className='mb-3 text-orange-300'>title:{job.title}</p>
            <img src={job.coverImage} alt="" style={{width:100 ,height:80}} className='rounded-xl'/>
            <p>posted By :{job.postedBy}</p>
            <p>category: {job.category}</p>
            <p>email: {job.userEmail}</p>
            <button className="btn btn-outline btn-primary mt-4">accept task</button>
            </div>)) }
        </div></div>
 </div>




     
    );
};

export default Home;