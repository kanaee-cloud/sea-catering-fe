/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import FeatureCarousel from "../../common/FeatureCarousel";

const Services = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center px-4 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.5 }}
        className="text-4xl font-bold mb-6"
      >
        Our Services
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: false, amount: 0.5 }}
        className="text-lg opacity-70 max-w-2xl mb-8"
      >
        We offer a range of services to enhance your dining experience, from
        meal customization to detailed nutritional information.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: false, amount: 0.5 }}
        className="w-full"
      >
        <FeatureCarousel />
      </motion.div>
    </section>
  );
};

export default Services;
