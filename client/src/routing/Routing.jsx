import React from "react";
import Home from "../pages/Home";
import Navbar from "../components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import VerifyUser from "../pages/VerifyUser";
import Cart from "../pages/Cart";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";
import BookDetails from "../components/BookDetails/BookDetails";
import AllBooks from "../pages/AllBooks";
import Footer from "../components/Footer/Footer";

const Routing = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="all-books" element={<AllBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="verify-email" element={<VerifyUser />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/book-details/:id" element={<BookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Routing;
