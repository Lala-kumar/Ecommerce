import React, { useContext } from "react";
import myContext from "../../context/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

const Order = () => {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <h1
        className="text-center font-bold text-2xl"
        style={{
          color: mode === "dark" ? "white" : "",
        }}
      >
        YOUR ORDERS
      </h1>

      {userid && order.filter((obj) => obj.userid === userid).length === 0 ? (
        <h1
          className="text-center text-2xl my-60"
          style={{
            color: mode === "dark" ? "white" : "",
          }}
        >
          You haven't order yet!
        </h1>
      ) : (
        <div>
          {order.length > 0 ? (
            <ul className="list-none pl-4">
              {order
                .filter((obj) => obj.userid === userid)
                .map((orderItem) => (
                  <li
                    key={`${orderItem.userid}_${orderItem.date}_${orderItem.paymentId}`}
                  >
                    <div className="mx-auto max-w-5xl justify-center px-6 xl:flex md:flex md:space-x-6 xl:px-0">
                      {orderItem.cartItems.map((item) => (
                        <div className="rounded-lg md:w-2/3 xl:w-1/2" key={item.id}>
                          <div
                            className="justify-between mb-6 rounded-lg bg-white p-6 shadow-2xl sm:flex sm:justify-start"
                            style={{
                              backgroundColor: mode === "dark" ? "#282c34" : "",
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            <img
                              src={item.imageUrl}
                              alt="product-image"
                              className="w-full rounded-lg sm:w-40"
                            />

                            <section className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-5 sm:mt-0">
                                <h1
                                  className="text-2xl font-bold text-gray-900"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {item.title}
                                </h1>

                                <p
                                  className="mt-1 text-base text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {item.category}
                                </p>

                                <p
                                  className="mt-1 text-base text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {item.description}
                                </p>
                                <p
                                  className="mt-1 text-base text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  ₹{item.price}
                                </p>
                              </div>
                            </section>
                          </div>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <h1
              className="text-center bg-orange-900 text-2xl my-60"
              style={{
                color: mode === "dark" ? "white" : "",
              }}
            >
              You haven't order yet!
            </h1>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Order;
