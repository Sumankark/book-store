import React from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Sidebar = ({ data }) => {
  return (
    <div className="bg-zinc-800 p-4 rounded text-white flex flex-col items-center justify-between h-[100%]">
      <div className="flex flex-col items-center">
        {" "}
        <img src={data.avatar} alt="image.." className="h-[10vh]" />
        <p className="mt-3 text-xl font-semibold ">{data.userName}</p>
        <p className="mt-1 text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 lg:block"></div>
      </div>
      <div className="w-full flex flex-col items-center justify-center lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-500 rounded transition-all duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-500 rounded transition-all duration-300"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-500 rounded transition-all duration-300"
        >
          Settings
        </Link>
      </div>
      <button className="bg-zinc-500 w-1/6  md:w-full  mt-4 lg:mt-0 items-center justify-center flex font-semibold py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300">
        Log Out <MdLogout className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;
