import { HandPlatter, TruckElectric, CalendarCheck2, Salad    } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const logos = [
  {
    id: 1,
    logo: HandPlatter,
    title: "Meal Customization",
  },
  {
    id: 2,
    logo: TruckElectric,
    title: "Delivery to Major Cities",
  },
  {
    id: 3,
    logo: Salad,
    title: "Detailed Nutritional Information",
  },
  {
    id: 4,
    logo: CalendarCheck2,
    title: "Subscription",
  },
];


const FeatureCarousel = () => {
  return (
    <div className="py-16 px-4 md:px-8 max-w-6xl mx-auto text-light">
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={40}
        loop={true}
        autoplay={{ delay: 3000 }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        className="w-full"
      >
        {logos.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="glassmorphism rounded-2xl shadow-xl p-8 max-w-sm flex flex-col items-center text-center">
              {/* <img src={item.logo} alt={item.title} className="w-20 h-20 mb-4" /> */}
              <item.logo className="w-20 h-20 mb-4 text-accent" />
              <h4 className="text-xl font-semibold ">{item.title}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeatureCarousel;
