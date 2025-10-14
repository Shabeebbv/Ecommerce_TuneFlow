import React from "react";
import "../styles/hero.css";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate=useNavigate()
  return (
    <div className="home">
      {/* Hero Banner Carousel */}
      <section className="hero-carousel">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          // effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop={true}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="banner-slide">
            {/* <video 
            src="videobanner.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="banner-video"/> */}
              <img src="banner4.1.jpg" alt="iPhone Banner" />
              <div className="banner-content">
                 <h1>Turn Every Song Into an <br /> Experience.</h1>
                <p>
                   Discover premium audio gear for your personal music experience.
                </p>
                <button className="btn" onClick={()=>{navigate('/products')}}>Shop Now</button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative banner-slide">
              <img src="banner9.jpg" alt="Shoes Sale" className= "w-full h-full object-fill" />
              <div className="banner-content">
                <h2>SALE UP TO 50% OFF</h2>
                <p>Limited-time headphone collection sale grab yours now!</p>
                <button className="btn"  onClick={()=>{navigate('/item/003')}}>Shop Now</button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>



      {/* Popular Categories */}
      <section className="categories">
        <h3>Explore Popular Brands</h3>
        <div className="category-grid">
          <div className="category"><button onClick={()=>navigate("/sony")}>
            <img src="https://i.pinimg.com/736x/fe/3a/32/fe3a321998860a03c1ef8329f6ae8b58.jpg" alt="SONY" />
            <p>SONY</p></button>
          </div>
          <div className="category"><button  onClick={()=>navigate("/marshall")}>
            <img src="https://i.pinimg.com/1200x/ed/55/db/ed55dbf8ca8d3ad8cd65e1aadda37394.jpg" alt="Marshall" />
            <p>Marshall</p></button>
          </div>
          <div className="category"><button  onClick={()=>navigate("/jbl")}>
            <img src="https://i.pinimg.com/1200x/68/f5/c8/68f5c8e521a85cec23f070e27f780ccf.jpg" alt="JBL" />
            <p>JBL</p></button>
          </div>
          <div className="category"><button  onClick={()=>navigate("/bose")}>
            <img src="Bose.jpeg" alt="BOSE" />
            <p>BOSE</p></button>
          </div>
          <div className="category"><button  onClick={()=>navigate("/zebronics")}>
            <img src="Zebronics.jpeg" alt="Zebronics" />
            <p>Zebronics</p></button>
          </div>
          <div className="category"><button  onClick={()=>navigate("/boat")}>
            <img src="https://i.pinimg.com/736x/48/c0/97/48c097fbc26184499810dc2665270f42.jpg" alt="Boat" />
            <p>Boat</p></button>
          </div>
          <div className="category"><button  onClick={()=>navigate("/noise")}>
            <img src="https://i.pinimg.com/1200x/4a/ba/0d/4aba0d12d3bd605b8334826fc3ba8229.jpg" alt="NOise" />
            <p>Noise</p></button>
          </div>
          <div className="category"><button  onClick={()=>navigate("/apple")}>
            <img src="https://i.pinimg.com/1200x/37/e2/2e/37e22ebe079a6b440358a793c96c0981.jpg" alt="Apple" />
            <p>Apple</p></button>
          </div>
        </div>
      </section>
    </div>
  );
};
