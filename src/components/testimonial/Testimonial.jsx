import React, { useContext } from "react";
import myContext from "../../context/myContext";

const Testimonial = () => {
  const context = useContext(myContext);

  const { mode } = context;

  return (
    <section className="text-gray-600 body-font mb-10">
      <div className="container px-5 py-10 mx-auto">
        <h1
          className=" text-center text-3xl font-bold text-black"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          Testimonial
        </h1>
         
        <h2
          className=" text-center text-2xl font-semibold mb-10"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          What our <span className=" text-pink-500">customers</span> are saying
        </h2>

        <div className="flex flex-wrap -m-4">
          {/* customer 1 */}
          <section className="lg:w-1/3 lg:mb-0 mb-6 p-4">
            <div className="h-full text-center">
              <img
                alt="testimonial"
                className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                src="https://th.bing.com/th/id/OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH?w=193&h=185&c=7&r=0&o=5&dpr=1.4&pid=1.7"
              />

              <p
                style={{ color: mode === "dark" ? "white" : "" }}
                className="leading-relaxed"
              >
                I had an amazing online shopping experience! The website was
                easy to navigate, and my order arrived promptly. The quality of
                the products exceeded my expectations. Will definitely shop here
                again!
              </p>

              <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />

              <h2
                style={{ color: mode === "dark" ? "#ff4162" : "" }}
                className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase"
              >
                Aryan sharma
              </h2>

              <p
                style={{ color: mode === "dark" ? "white" : "" }}
                className="text-gray-500"
              >
                Senior Product Designer
              </p>
            </div>
          </section>

          {/* customer 2 */}
          <section className="lg:w-1/3 lg:mb-0 mb-6 p-4">
            <div className="h-full text-center">
              <img
                alt="testimonial"
                className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                src="https://cdn-icons-png.flaticon.com/128/2763/2763444.png"
              />

              <p
                style={{ color: mode === "dark" ? "white" : "" }}
                className="leading-relaxed"
              >
                Great variety of products and affordable prices. The website
                layout is user-friendly, making it easy to find what I was
                looking for. The checkout process was smooth, and my items
                arrived on time. 
              </p>

              <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />

              <h2
                style={{ color: mode === "dark" ? "#ff4162" : "" }}
                className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase"
              >
                pooja bisht
              </h2>

              <p
                style={{ color: mode === "dark" ? "white" : "" }}
                className="text-gray-500"
              >
                UI Develeoper
              </p>
            </div>
          </section>

          {/* customer 13 */}
          <section className="lg:w-1/3 lg:mb-0 p-4">
            <div className="h-full text-center">
              <img
                alt="testimonial"
                className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                src="https://webknudocs.vercel.app/logo/react.png"
              />

              <p
                style={{ color: mode === "dark" ? "white" : "" }}
                className="leading-relaxed"
              >
                Impressed with the fast shipping and well-packaged items. The
                quality of the products I received was top-notch. I appreciate
                the attention to detail. Will be shopping here regularly.
              </p>

              <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />

              <h2
                style={{ color: mode === "dark" ? "#ff4162" : "" }}
                className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase"
              >
                React Js team
              </h2>

              <p
                style={{ color: mode === "dark" ? "white" : "" }}
                className="text-gray-500"
              >
                CTO
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
