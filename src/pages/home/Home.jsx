import React from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";

const Home = () => {
  return (
    <>
      <Layout>
        <HeroSection />
        <Filter />
      </Layout>
    </>
  );
};

export default Home;
