import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";

const Home = () => {
  const context = useContext(myContext);

  return (
    <>
      <Layout>
        <p>Name: {context.name} </p>
        <p>Name: {context.rollno} </p>
      </Layout>
    </>
  );
};

export default Home;
