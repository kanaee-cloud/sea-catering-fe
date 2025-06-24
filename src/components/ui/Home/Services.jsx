import FeatureCarousel from "../../common/FeatureCarousel";

const Services = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center ">
      <h2 className="text-4xl font-bold mb-8 text-center">Our Services</h2>
      <p className="text-lg opacity-70 text-center max-w-2xl">
        We offer a range of services to enhance your dining experience, from
        meal customization to detailed nutritional information.
      </p>        
      <FeatureCarousel />
    </section>
  );
};

export default Services;
