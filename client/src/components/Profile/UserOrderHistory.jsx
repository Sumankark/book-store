import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loading";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/orders/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        setError("Error fetching order history. Please try again later.");
        console.error("Error fetching order history:", error);
      }
    };
    fetchOrderHistory();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!orderHistory) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] p-4 mt-12 bg-gray-50 rounded-lg shadow-lg">
      {orderHistory.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-500 mb-6">
            No Order History
          </h1>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-zinc-200 rounded-lg text-gray-700 font-semibold mb-6 border-b border-gray-300">
            <h1 className="col-span-1 text-left">No.</h1>
            <h1 className="col-span-3 text-left border-r-2 border-gray-300 pr-4">
              Book
            </h1>
            <h1 className="col-span-4 text-left border-r-2 border-gray-300 pr-4">
              Description
            </h1>
            <h1 className="col-span-2 text-left border-r-2 border-gray-300 pr-4">
              Price
            </h1>
            <h1 className="col-span-1 text-left lg:border-r-2 border-gray-300 pr-4">
              Status
            </h1>
            <h1 className="col-span-1 hidden lg:block text-left border-r-2 border-gray-300 pr-4">
              Mode
            </h1>
          </div>

          {orderHistory.map((item, i) => (
            <div
              className="grid grid-cols-1 gap-4 p-4 mb-4 bg-white rounded-lg shadow-sm md:grid-cols-12 md:gap-4 hover:shadow-md transition-shadow duration-300 border border-gray-200"
              key={item._id}
            >
              <div className="md:hidden">
                <div className="flex justify-between">
                  <span className="font-semibold">No:</span>
                  <span>{i + 1}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold">Book:</span>
                  {item.book ? (
                    <Link
                      to={`/book-details/${item.book._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.book.title}
                    </Link>
                  ) : (
                    "Book not available"
                  )}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold mr-5">Description:</span>
                  {item.book ? item.book.desc.slice(0, 50) + "..." : "N/A"}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold">Price:</span>
                  <span>{item.book ? `$${item.book.price}` : "N/A"}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`${
                      item.status === "order placed"
                        ? "text-green-500"
                        : item.status === "canceled"
                        ? "text-red-500"
                        : ""
                    } font-medium`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold">Mode:</span>
                  <span>COD</span>
                </div>
              </div>

              {/* Desktop view */}
              <div className="hidden md:block col-span-1">{i + 1}</div>
              <div className="hidden md:block col-span-3 text-left border-r-2 border-gray-200 pr-4">
                {item.book ? (
                  <Link
                    to={`/book-details/${item.book._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.book.title}
                  </Link>
                ) : (
                  "Book not available"
                )}
              </div>
              <div className="hidden md:block col-span-4 text-left border-r-2 border-gray-200 pr-4">
                {item.book ? item.book.desc.slice(0, 50) + "..." : "N/A"}
              </div>
              <div className="hidden md:block col-span-2 text-left border-r-2 border-gray-200 pr-4">
                {item.book ? `$${item.book.price}` : "N/A"}
              </div>
              <div className="hidden md:block col-span-1 text-left lg:border-r-2 border-gray-200 pr-4">
                <span
                  className={`${
                    item.status === "order placed"
                      ? "text-green-500"
                      : item.status === "canceled"
                      ? "text-red-500"
                      : ""
                  } font-medium`}
                >
                  {item.status}
                </span>
              </div>
              <div className="hidden lg:block col-span-1 text-left border-r-2 border-gray-200 pr-4">
                COD
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
