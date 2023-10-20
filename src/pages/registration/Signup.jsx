import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/myContext";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../fireabase/firebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const signup = async () => {
    setLoading(true);

    if (name === "" || email === "" || password === "") {
      return toast.error("All fields are required");
    }

    try {
      //store data to Authentication firebase
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };

      //storing user to firestore
      const userRef = collection(fireDB, "user");

      await addDoc(userRef, user);

      setName("");
      setEmail("");
      setPassword("");

      toast.success("Signup successfully!");

      setLoading(false);
    } catch (error) {
      toast.error("Signin Failed", {
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
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <div>
          <input
            value={name}
            type="text"
            name="name"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Name"
            onChange={nameHandler}
          />
        </div>
        <div>
          <input
            value={email}
            type="email"
            name="email"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
            onChange={emailHandler}
          />
        </div>
        <div>
          <input
            value={password}
            type="password"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
            onChange={passwordHandler}
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button
            onClick={signup}
            className=" bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg"
          >
            Signup
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-red-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
