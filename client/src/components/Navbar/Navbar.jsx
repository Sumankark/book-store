import React from "react";

const Navbar = () => {
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
  ];
  return (
    <div className="flex bg-zinc-600 text-white px-8 py-2 items-center  justify-between">
      <div className="flex items-center">
        <img
          className="h-10 me-4"
          src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
          alt="logo"
        />
        <h1 className="text-2xl font-semibold">BookStore</h1>
      </div>
      <div className="nav-link-bookstore ">
        <div className="flex gap-4">
          {links.map((items, i) => (
            <div
              className="hover:text-blue-500 transition-all duration-300"
              key={i}
            >
              {items.title}
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Navbar;
