import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loader/Loading";
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import UserDataInfo from "./UserDataInfo";

const AllOrders = () => {
  const [options, setOptions] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [values, setValues] = useState({ status: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Moved fetchOrders function outside of useEffect
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/orders/get-all-orders",
        { headers }
      );
      setAllOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = allOrders[i]._id;
    try {
      const response = await axios.patch(
        `http://localhost:8080/orders/update-status/${id}`,
        { status: values.status },
        { headers }
      );
      alert(response.data.message);

      // Re-fetch orders after status update
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 mt-12">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      {/* Mobile View */}
      <div className="block md:hidden">
        {allOrders.map((order, i) => (
          <div
            key={order._id}
            className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">No:</span>
                <span>{i + 1}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Book:</span>
                <Link
                  to={`book-details/${order.book?._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {order.book?.title || "No book data"}
                </Link>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Description:</span>
                <span>
                  {order.book?.desc?.slice(0, 50) || "No description"}...
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Price:</span>
                <span>{order.book?.price || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Status:</span>
                <span
                  className={`${
                    order.status === "Order Placed"
                      ? "text-green-500"
                      : order.status === "Canceled"
                      ? "text-red-500"
                      : ""
                  } font-medium cursor-pointer`}
                  onClick={() => setOptions(i)}
                >
                  {order.status}
                </span>
                {options === i && (
                  <div className="flex items-center mt-2">
                    <select
                      name="status"
                      className="border border-gray-300 rounded px-2 py-1"
                      onChange={(e) => handleChange(e, i)}
                      value={values.status}
                    >
                      {[
                        "Order Placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((status, index) => (
                        <option value={status} key={index}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      className="ml-2 p-1 text-green-500"
                      onClick={() => submitChanges(i)}
                    >
                      <FaCheck />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-2">
                <FaUserLarge />
                <button
                  className="text-blue-500"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(order.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Sn.</th>
                <th className="py-3 px-4 text-left">Books</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">
                  <FaUserLarge />
                </th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, i) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">
                    <Link
                      to={`book-details/${order.book?._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {order.book?.title || "No book data"}
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    {order.book?.desc?.slice(0, 50) || "No description"}...
                  </td>
                  <td className="py-2 px-4">{order.book?.price || "N/A"}</td>
                  <td className="py-2 px-4">
                    <button
                      className={`${
                        order.status === "Order Placed"
                          ? "text-green-500"
                          : order.status === "Canceled"
                          ? "text-red-500"
                          : ""
                      } font-medium`}
                      onClick={() => setOptions(i)}
                    >
                      {order.status}
                    </button>
                    {options === i && (
                      <div className="mt-2 flex items-center">
                        <select
                          name="status"
                          className="border border-gray-300 rounded px-2 py-1"
                          onChange={(e) => handleChange(e, i)}
                          value={values.status}
                        >
                          {[
                            "Order Placed",
                            "Out for delivery",
                            "Delivered",
                            "Canceled",
                          ].map((status, index) => (
                            <option value={status} key={index}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <button
                          className="ml-2 p-1 text-green-500"
                          onClick={() => submitChanges(i)}
                        >
                          <FaCheck />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-500"
                      onClick={() => {
                        setUserDiv("fixed");
                        setUserDivData(order.user);
                      }}
                    >
                      <IoOpenOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {userDivData && (
        <UserDataInfo
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}
    </div>
  );
};

export default AllOrders;
