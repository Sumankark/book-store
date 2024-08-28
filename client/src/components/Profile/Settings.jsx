import React, { useEffect, useState, useMemo } from "react";
import Loading from "../Loader/Loading";
import { hitApi } from "../../services/hitapi";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize headers
  const headers = useMemo(
    () => ({
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    []
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await hitApi.get("/users/user-detail", { headers });
        setProfileData(response.data.data);
        setValue({ address: response.data.data.address });
      } catch (error) {
        setError("Error fetching profile data. Please try again later.");
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [headers]);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await hitApi.patch("/users/update-address", value, {
        headers,
      });
      alert(response.data.message);
    } catch (error) {
      setError("Error updating address. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {error ? (
        <div className="text-center text-red-500 mb-6">{error}</div>
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
