import React from "react";
import Banner from "../../components/ui/Home/Banner";
import About from "../../components/ui/Home/About";
import Services from "../../components/ui/Home/Services";
import Review from "../../components/ui/Home/Review";

const Home = () => {
  return (
    <>
    <main>
      <Banner />
      <About />
      <Services />
      <Review />
    </main>
    </>
  );
};

export default Home;
