import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loader/Loading";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/users/user-detail",
          { headers }
        );
        setProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };
    fetch();
  }, [headers]);

  return (
    <div className="bg-zinc-200 flex flex-col h-screen m-1">
      <div className="flex flex-1">
        {!profile ? (
          <div className="w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="w-full md:w-2/6 bg-white border-r border-gray-200 h-screen">
              <Sidebar data={profile} />
            </div>
            <div className="w-full md:w-4/6 overflow-auto p-4">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
