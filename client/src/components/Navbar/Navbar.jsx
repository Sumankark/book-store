import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  if (isLoggedIn === false) {
    links.splice(3, 3);
  }
  if (isLoggedIn == true && role == "user") {
    links.splice(5, 1);
  }
  if (isLoggedIn == true && role == "admin") {
    links.splice(3, 2);
  }
  const toggleMovileNav = () => {
    setMobileNav(!mobileNav);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full shadow-lg z-50 flex bg-zinc-600 text-white px-8 py-2 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookStore</h1>
        </Link>
        <div className="nav-link-bookstore block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item, i) => (
              <Link
                to={item.link}
                className="hover:text-blue-500 transition-all duration-300"
                key={i}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex gap-4">
            {isLoggedIn === false ? (
              <>
                <Link
                  to="/login"
                  className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-600 transition-all duration-300"
                >
                  SignIn
                </Link>
                <Link
                  to="/signup"
                  className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-600 transition-all duration-300"
                >
                  SignUp
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
          <button
            aria-label="Toggle menu"
            className="text-white text-2xl md:hidden hover:text-blue-200"
            onClick={toggleMovileNav}
          >
            <MdMenu />
          </button>
        </div>
      </nav>
      <div
        className={`${
          mobileNav ? "block" : "hidden"
        } bg-zinc-400 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className="text-zinc-100 mb-8 text-2xl font-semibold hover:text-blue-500 transition-all duration-300"
            key={i}
            onClick={() => setMobileNav(false)}
          >
            {item.title}
          </Link>
        ))}

        {isLoggedIn === false ? (
          <>
            <Link
              to="/login"
              className="px-4 py-1 mb-8 text-2xl font-semibold border border-blue-500 rounded hover:bg-white text-zinc-100 hover:text-zinc-600 transition-all duration-300"
              onClick={() => setMobileNav(false)}
            >
              SignIn
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 mb-8  text-2xl font-semibold bg-blue-500 rounded text-zinc-100 hover:bg-white hover:text-zinc-600 transition-all duration-300"
              onClick={() => setMobileNav(false)}
            >
              SignUp
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Navbar;
