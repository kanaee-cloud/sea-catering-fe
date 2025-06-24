import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useTestimonials } from "../../../hooks/useTestimonials";
import ReviewCard from "../../common/ReviewCard";

const Review = () => {
  const { testimonials, loading, error } = useTestimonials();

  return (
    <div className="w-full h-screen py-10">
      <div className="text-2xl font-bold text-center mb-8">
        What Our Customers Say
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <Swiper
          spaceBetween={30}
          slidesPerView="auto"
          loop={true}
          speed={4000} 
          autoplay={{
            delay: 0, // tidak ada jeda antar swipe
            disableOnInteraction: false,
          }}
          grabCursor={false}
          allowTouchMove={false} 
          modules={[Autoplay]}
          className="w-full"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide
              key={testimonial.id}
              style={{ width: "300px" }} 
            >
              <ReviewCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Review;

