import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import VerifyUser from "../pages/VerifyUser";
import Cart from "../pages/Cart";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";
import BookDetails from "../components/BookDetails/BookDetails";
import AllBooks from "../pages/AllBooks";
import Favourites from "../components/Profile/Favourites";
import UserOrderHistory from "../components/Profile/UserOrderHistory";
import Settings from "../components/Profile/Settings";
import AllOrders from "../pages/AllOrders";
import AddBook from "../pages/AddBook";
import UpdateBooks from "../pages/UpdateBooks";

const Routing = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    if (token && id && role) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(role));
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="fixed top-0 left-0 w-full z-10" />

      <main className="flex-1 pt-[var(--navbar-height)] overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="all-books" element={<AllBooks />} />
          <Route path="login" element={<Login />} />
          <Route path="/update-book/:id" element={<UpdateBooks />} />
          <Route path="signup" element={<Signup />} />
          <Route path="verify-email" element={<VerifyUser />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="profile" element={<Profile />}>
            {role === "user" ? (
              <Route index element={<Favourites />} />
            ) : (
              <Route index element={<AllOrders />} />
            )}
            <Route path="add-books" element={<AddBook />} />

            <Route path="order-history" element={<UserOrderHistory />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="book-details/:id" element={<BookDetails />} />
        </Routes>
      </main>

      <Footer className="bg-white border-t border-gray-200 py-4 text-center" />
    </div>
  );
};

export default Routing;
