import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useTestimonials } from "../../../hooks/useTestimonials";
import ReviewCard from "../../common/ReviewCard";
import ReviewForm from "./ReviewForm";

const Review = () => {
  const { testimonials, loading, error } = useTestimonials();

  return (
    <div className="w-full h-[60vh] py-10">
      <div className=" font-bold text-center mb-8">
        <h2 className="text-2xl">What Our Customers Say</h2>
        <p className="text-center opacity-70 mt-6">People Experience about us</p>
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
            delay: 0, 
            disableOnInteraction: false,
          }}
          grabCursor={false}
          allowTouchMove={false}
          modules={[Autoplay]}
          className="w-full"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} style={{ width: "300px" }}>
              <ReviewCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      
    </div>
  );
};

export default Review;
