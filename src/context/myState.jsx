import React, { useEffect, useState, useCallback } from "react";
import MyContext from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../fireabase/firebaseConfig";
import { toast } from "react-toastify";

const defaultProduct = {
  title: "",
  price: "",
  imageUrl: "",
  category: "",
  description: "",
  time: Timestamp.now(),
  date: new Date().toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }),
};

const MyState = (props) => {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(defaultProduct);
  const [product, setProduct] = useState([]);

  const clearFields = () => {
    setProducts(defaultProduct);
  };

  // ********************** Get Product Section  **********************

  const getProduct = useCallback(() => {
    setLoading(true);
    try {
      // Creates a query to get data from the "products" collection in a Firestore database
      const q = query(
        collection(fireDB, "products"),
        // Orders the results based on the "time" field in ascending order
        orderBy("time")
      );

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];

        QuerySnapshot.forEach((doc) => {
          // Iterates through the documents in the query result and constructs an array of products
          productsArray.push({ ...doc.data(), id: doc.id });
        });

        setProduct(productsArray);
      });

      // Returns a cleanup function. This function will be called when the component unmounts
      setLoading(false);
      return () => data;
    } catch (error) {
      console.error(error); // Log the error for debugging purposes

      // Handle specific error cases and show custom error messages
      if (error.code === "permission-denied") {
        toast.error("Permission denied. Please check your access rights.");
      } else if (error.code === "unavailable") {
        toast.error("Service unavailable. Please try again later.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
    setLoading(false);
  });

  useEffect(() => {
    getProduct();
  }, []);

  // ********************** Add Products Section  **********************
  const addProduct = async () => {
    if (
      products.title == "" ||
      products.price == "" ||
      products.imageUrl == "" ||
      products.category == "" ||
      products.description == ""
    ) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);

    try {
      //reference to a specific Firestore collection is created.
      const productRef = collection(fireDB, "products");
      //add a new document (record) to this collection
      await addDoc(productRef, products);

      clearFields();
      toast.success("Added product succefully!");
      setTimeout(() => {
      window.location.href = "/dashboard";
      }, 700);
      getProduct();

      setLoading(false);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes

      // Handle specific error cases and show custom error messages
      if (error.code === "permission-denied") {
        toast.error(
          "Permission denied. You don't have access to add products."
        );
      } else if (error.code === "invalid-argument") {
        toast.error("Invalid data provided. Please check your input.");
      } else {
        toast.error(
          "An error occurred while adding the product. Please try again."
        );
      }
    }
    setLoading(false);
  };

  // ********************** Toggle mode Section  **********************
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");

      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");

      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
