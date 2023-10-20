import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireabase/firebaseConfig";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("user", JSON.stringify(result));

      navigate("/");

      toast.success("Login successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
    } catch (error) {
      toast.error("Login Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
    
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" flex justify-center items-center h-screen">
      
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
            onChange={emailHandler}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
            onChange={passwordHandler}
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button
            onClick={login}
            className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Don't have an account{" "}
            <Link className=" text-yellow-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
