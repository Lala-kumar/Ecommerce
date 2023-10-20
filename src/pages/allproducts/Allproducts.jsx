import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Filter from "../../components/filter/Filter";

import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Allproduct = () => {
  const context = useContext(myContext);
  const { mode, product, searchkey, filterType, filterPrice } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const navigation = useNavigate();

  // add to cart
  const addCart = (product) => {
    const serializedProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      description: product.description,
      date: product.date,
    };

    dispatch(addToCart(serializedProduct));
    toast.success("added to cart successfully!");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const filteredProducts = product
    .filter((obj) => obj.title.toLowerCase().includes(searchkey))
    .filter((obj) => obj.category.toLowerCase().includes(filterType))
    .filter((obj) => obj.price.includes(filterPrice));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Filter />
      <div className="text-gray-600 body-font">
        <section className="container px-5 py-8 md:py-16 mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center w-full mt-4">
              <p className="text-lg font-medium">
                No products available with selected filters.
              </p>
            </div>
          ) : (
            <section className="flex flex-wrap -m-4 justify-center items-center">
              {filteredProducts.map((item, index) => {
                const { title, price, imageUrl, id } = item;

                return (
                  <div
                    key={index}
                    className="p-4 md:w-1/4 drop-shadow-lg justify-center items-center"
                  >
                    <div
                      className=" h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <div className="flex justify-center cursor-pointer">
                        <img
                          className="sm:py-6 rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out"
                          src={imageUrl}
                          alt="blog"
                          onClick={() =>
                            // (window.location.href = `/productinfo/${id}`)
                            navigation(`/productinfo/${id}`)
                          }
                        />
                      </div>

                      <div className="p-5 border-t-2">
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          E-Shop
                        </h2>
                        <h1
                          className="title-font text-lg font-medium text-gray-900 mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {title}
                        </h1>

                        <p
                          className="leading-relaxed mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          ₹{price}
                        </p>
                        <div className=" flex justify-center">
                          <button
                            onClick={() => addCart(item)}
                            type="button"
                            className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Allproduct;
