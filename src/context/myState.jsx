import React, { useEffect, useState, useCallback } from "react";
import MyContext from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { fireDB } from "../fireabase/firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const navigate = useNavigate();

  const clearFields = () => {
    setProducts(defaultProduct);
  };

  // ********************** Get Product Section  **********************

  const getProductData = useCallback(() => {
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
      console.error(error);

      toast.error("An error occurred. Please try again.");
    }
    setLoading(false);
  });

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
        // window.location.href = "/dashboard";
        navigate("/dashboard");
      }, 700);
      getProductData();

      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while adding the product. Please try again."
      );
    }
    setLoading(false);
  };

  // ********************** Update, Delete & Edit Products Section  **********************

  //edit product

  const editHandler = (item) => {
    setProducts(item);
  };

  //update product

  const updateProduct = async () => {
    setLoading(true);
    try {
      //setDoc(reference, data) is used to set the data of a specific document.
      //doc(fireDb, "products", products.id) constructs a reference to a specific document in the "products" collection.
      await setDoc(doc(fireDB, "products", products.id), products);

      clearFields();
      toast.success("Product Updated successfully");
      setTimeout(() => {
        // window.location.href = "/dashboard";
        navigate("/dashboard");
      }, 800);

      getProductData(); // Fetch updated product data from the database

      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product. Please try again later.");
      setLoading(false);
    }
    setLoading(false);
  };

  // delete product

  const deleteProduct = async (item) => {
    try {
      setLoading(true);

      //deleteDoc(reference) deletes the document specified by the provided reference.
      //doc(fireDb, "products", item.id) constructs a reference to the specific document in the "products" collection identified by item.id.
      await deleteDoc(doc(fireDB, "products", item.id));

      toast.success("Product Deleted successfully");
      setLoading(false);
      getProductData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product. Please try again later.");
      setLoading(false);
    }
  };

  // ********************** Order Section  **********************

  const getOrderData = async () => {
    setLoading(true);

    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];

      result.forEach((doc) => {
        ordersArray.push(doc.data()); // Extract data from each document and add it to the ordersArray.
        setLoading(false);
      });

      setOrder(ordersArray);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // ********************** User Section  **********************

  const getUserData = async () => {
    setLoading(true);

    try {
      const result = await getDocs(collection(fireDB, "user"));
      const usersArray = [];

      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });

      setUser(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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

  // ********************** Admin's Dashboard Section  **********************

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);

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
        editHandler,
        updateProduct,
        deleteProduct,
        order,
        user,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
