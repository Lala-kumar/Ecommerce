import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import ProductCard from "../../components/productCard/productCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Layout>
        <HeroSection />
        <ProductCard />
        <div className="flex justify-center m-10">
          <Link to={"/allproducts"}>
            <button className=" bg-gray-300 px-5 py-2 rounded-xl">
              See more
            </button>
          </Link>
        </div>
        <Track />
        <Testimonial />
      </Layout>
    </>
  );
};

export default Home;
