import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import Loading from "../components/Loader/Loading";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { hitApi } from "../services/hitapi";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle for small screens
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await hitApi.get("/users/user-detail", { headers });
        setProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };
    fetchProfile();
  }, [headers]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar on small screens
  };

  return (
    <div className="flex h-screen bg-zinc-200">
      {!profile ? (
        <div className="flex flex-1 items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {/* Sidebar Toggle Button (only visible on small screens) */}
          <div className="md:hidden fixed top-4  z-50 cursor-pointer text-3xl mt-12">
            {isSidebarOpen ? (
              <MdKeyboardDoubleArrowLeft
                className="bg-zinc-100 p-1"
                onClick={toggleSidebar}
              />
            ) : (
              <MdKeyboardDoubleArrowRight
                className="bg-zinc-600 p-1 text-white"
                onClick={toggleSidebar}
              />
            )}
          </div>

          {/* Sidebar (always visible on large screens) */}
          <div
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 fixed md:static top-0 left-0 w-64 bg-white border-r border-gray-200 h-full z-40 transition-transform duration-300`}
          >
            <Sidebar data={profile} />
          </div>

          {/* Main Content Area - Only the Outlet is scrollable */}
          <div className="flex-1 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
