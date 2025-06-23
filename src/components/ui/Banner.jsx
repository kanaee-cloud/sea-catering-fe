import AnimationButton from "../common/AnimationButton";
import OrbitSpecialists from "../common/OrbitSpecialist";

const Banner = () => {
  return (
    <section className="h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-12 px-4 md:px-8 lg:px-16 py-12">
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          SEA Catering
        </h2>
        <p className="text-base md:text-lg text-gray-300 mb-6">
          Healthy Meals, Anytime, Anywhere.
        </p>
        <AnimationButton title="Order Now" />
      </div>

      <div className="w-full lg:w-1/2 flex justify-center">
        <OrbitSpecialists />
      </div>
    </section>
  );
};

export default Banner;
