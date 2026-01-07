import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Replace these URLs with actual colorful logo images for each brand
const logoData = [
  { name: 'Visa', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png' },
  { name: 'PayPal', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
  { name: 'Toyota', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
  { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Adidas', url: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { name: 'Netflix', url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { name: 'FedEx', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/FedEx_Express.svg' }
];

const BrandCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <div className='bg-base-200' style={{ padding: '40px' }}>
   <h3 className="text-3xl m-5 text-center font-bold ">
      Trusted By <span className="text-violet-500"> Top Brands</span>
    </h3>      <Slider {...settings}>
        {logoData.map((logo, index) => (
          <div key={index} style={{ padding: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px',
             
              borderRadius: '3px',
            
              padding: '15px'
            }}>
              <img 
                src={logo.url} 
                alt={logo.name} 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain',
                  filter: 'none' // Ensures colors are shown
                }} 
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandCarousel;