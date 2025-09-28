import React from "react";
import "../styles/hero.css";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Hero = () => {
  return (
    <div className="home">
      {/* Hero Banner Carousel */}
      <section className="hero-carousel">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="banner-slide">
              <img src="Banner1.jpg" alt="iPhone Banner" />
              <div className="banner-content">
                 <h1>Turn Every Song Into an <br /> Experience.</h1>
                <p>
                   Discover premium audio gear for your personal music experience.
                </p>
                <button className="btn">Shop Now</button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="banner-slide">
              <img src="earbudb2.jpg" alt="Shoes Sale" />
              <div className="banner-content">
                <h2>SALE UP TO 50% OFF</h2>
                <p>Don’t miss our exclusive sports collection sale.</p>
                <button className="btn">Shop Now</button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Popular Categories */}
      <section className="categories">
        <h3>Explore Popular Categories</h3>
        <div className="category-grid">
          <div className="category">
            <img src="headphones2.jpg" alt="headphones" />
            <p>Headphones</p>
          </div>
          <div className="category">
            <img src="earbuds1.jpg" alt="eaarbud" />
            <p>EarBuds</p>
          </div>
          <div className="category">
            <img src="/images/luxury.png" alt="Neckband" />
            <p>Neckband</p>
          </div>
          <div className="category">
            <img src="/images/home.png" alt="Home Decor" />
            <p>Headset</p>
          </div>
          <div className="category">
            <img src="/images/health.png" alt="Health" />
            <p>Health & Beauty</p>
          </div>
          <div className="category">
            <img src="/images/groceries.png" alt="Groceries" />
            <p>Speakers</p>
          </div>
          <div className="category">
            <img src="/images/sneakers.png" alt="Sneakers" />
            <p>Soundbar</p>
          </div>
        </div>
      </section>
    </div>
  );
};
