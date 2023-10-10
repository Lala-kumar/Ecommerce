import React from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/productCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <Layout>
        <HeroSection />
        <Filter />
        <ProductCard />
        <Track />
        <Testimonial/>
      </Layout>
    </>
  );
};

export default Home;
