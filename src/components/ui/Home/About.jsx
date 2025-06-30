/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import bannerImage from '../../../assets/images/banner.png';

const About = () => {
  return (
    <section className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-12 px-4 md:px-8 lg:px-16 py-12">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.5 }}
        className="w-full lg:w-1/2 flex justify-center"
      >
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full max-w-md object-contain rounded-xl glassmorphism shadow-xl"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: false, amount: 0.5 }}
        className="w-full lg:w-1/2"
      >
        <div className="p-6 md:p-8 rounded-xl shadow-xl text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent">About Us</h2>
          <p className="text-base md:text-lg opacity-80 text-justify leading-relaxed">
            SEA Catering has recently gained a lot of attention for providing customizable healthy meals that can be delivered to cities across Indonesia. What started as a small business has now gone viral, leading to a huge increase in orders from customers all over the country. To keep up with this rapid growth and ensure our customers have a better experience, we’ve decided to invest in a web or mobile app.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
