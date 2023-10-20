import React from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import ProductCard from "../../components/productCard/productCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Layout>
        <HeroSection />
        <ProductCard />
        <div className="flex justify-center -mt-10 mb-4 p-6">
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
