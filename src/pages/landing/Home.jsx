import React from "react";
import Banner from "../../components/ui/Home/Banner";
import About from "../../components/ui/Home/About";
import Services from "../../components/ui/Home/Services";
import Review from "../../components/ui/Home/Review";
import ReviewForm from "../../components/ui/Home/ReviewForm";

const Home = () => {
  return (
    <>
    <main>
      <Banner />
      <About />
      <Services />
      <Review />
      <ReviewForm />
    </main>
    </>
  );
};

export default Home;
