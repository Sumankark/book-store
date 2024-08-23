import React from "react";
import { NavLink } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Sidebar = ({ data }) => {
  return (
    <div className="bg-zinc-800 p-4 rounded text-white flex flex-col items-center justify-between h-full">
      <div className="flex flex-col items-center mt-12">
        <img src={data.avatar} alt="User Avatar" className="h-[10vh]" />
        <p className="mt-3 text-xl font-semibold ">{data.userName}</p>
        <p className="mt-1 text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 lg:block"></div>
      </div>

      <div className="w-full flex flex-col items-center justify-center lg:flex">
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-zinc-500 text-zinc-900 font-semibold w-full py-2 text-center rounded transition-all duration-300"
              : "text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-500 rounded transition-all duration-300"
          }
        >
          Favourites
        </NavLink>
        <NavLink
          to="/profile/orderHistory"
          className={({ isActive }) =>
            isActive
              ? "bg-zinc-500 text-zinc-900 font-semibold w-full py-2 text-center rounded transition-all duration-300"
              : "text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-500 rounded transition-all duration-300"
          }
        >
          Order History
        </NavLink>
        <NavLink
          to="/profile/settings"
          className={({ isActive }) =>
            isActive
              ? "bg-zinc-500 text-zinc-900 font-semibold w-full py-2 text-center rounded transition-all duration-300"
              : "text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-500 rounded transition-all duration-300"
          }
        >
          Settings
        </NavLink>
      </div>

      <button className="bg-zinc-500 w-full mt-4 lg:mt-0 flex items-center justify-center font-semibold py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300">
        Log Out <MdLogout className="ml-4" />
      </button>
    </div>
  );
};

export default Sidebar;
