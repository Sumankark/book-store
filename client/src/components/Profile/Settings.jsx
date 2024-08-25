import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loading";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState();
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
        setProfileData(response.data.data);
        setValue({ address: response.data.data.address });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:8080/users/update-address",
        value,
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {!profileData ? (
        <div className="flex items-center justify-center h-full">
          <Loading />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          <div className="mb-6">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold"
              >
                Username
              </label>
              <p className="text-red-900">{profileData.userName}</p>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email
              </label>
              <p className="text-gray-900">{profileData.email}</p>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="5"
              placeholder="Enter your address"
              value={value.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
