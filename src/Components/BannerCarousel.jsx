import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// 1. IMPORT YOUR IMAGES HERE
// Replace './path-to-your-image.jpg' with your actual file paths
import slideImg1 from '../assets/freelance_banner.png';
import slideImg2 from '../assets/annie-spratt-QckxruozjRg-unsplash.jpg';
import slideImg3 from '../assets/fotis-fotopoulos-6sAl6aQ4OWI-unsplash.jpg';
import { Link } from 'react-router';

const BannerCarousel = () => {
  // 2. UPDATE THE ARRAY WITH IMPORTED VARIABLES
  const slides = [
    { id: 1, image: slideImg1 },
    { id: 2, image: slideImg2 },
    { id: 3, image: slideImg3 },
  ];

  return (
    <div className="w-full h-[75vh]">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full w-full" // Changed h-3/4 to full to fill the container
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-center bg-black/50">
    <h1 className="text-3xl font-bold">  Find Your Perfect Freelancer
                </h1>
 <p className="mt-4 text-xl"> Connect with top talent and get your projects done efficiently. <br className="hidden md:block" />
                  It helps businesses turn ideas into fast, modern, and scalable web applications.
                </p>
               <Link to="allJobs"><button className="bg-[#b8482b] hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-bold transition-all flex items-center m-3 gap-2"
>explore more</button></Link> 
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          transform: scale(0.7);
        }
        .swiper-pagination-bullet-active {
          background: #fbbf24 !important;
        }
      `}</style>
    </div>
  );
};

export default BannerCarousel;