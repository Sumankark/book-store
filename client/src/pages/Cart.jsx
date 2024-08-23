import React, { useEffect, useState } from "react";
import Loading from "../components/Loader/Loading";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/cart/get-user-cart`,
          { headers }
        );
        setCart(response.data.data);

        const totalPrice = response.data.data.reduce(
          (sum, item) => sum + item.price,
          0
        );
        setTotal(totalPrice);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [cart]);

  if (!cart) {
    return <Loading />;
  }

  const handleRemoveBook = async (bookId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/cart/remove-from-cart/${bookId}`,
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Error removing book from cart.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center  p-4 bg-gray-200 mt-12">
      {cart.length === 0 ? (
        <h1 className="text-center text-gray-500 text-xl font-semibold mt-10">
          Your cart is empty!
          <MdRemoveShoppingCart className="h-[10vh] w-40" />
        </h1>
      ) : (
        <>
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-24 w-30 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1 mx-4">
                  <h1 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {item.desc.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <h1 className="text-lg font-semibold text-gray-800">
                    NRs. {item.price}
                  </h1>
                  <button
                    className="text-red-600 hover:text-red-800 transition-colors"
                    onClick={() => handleRemoveBook(item._id)}
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="  max-w-4xl mt-6 p-4 bg-white shadow-lg rounded-lg border-t border-gray-200 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Total Amount
            </h2>
            <div className="flex flex-col items-center mb-6 w-full">
              <div className="flex justify-between w-full mb-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  {cart.length} book{cart.length !== 1 ? "s" : ""}
                </h3>

                <h3 className="text-2xl font-semibold text-gray-800">
                  NRs. {total.toFixed(2)}
                </h3>
              </div>
            </div>
            <button className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors">
              Place Your Order
            </button>
          </div>

          {/* <div className="w-full max-w-4xl mt-6 p-4 bg-white shadow-lg rounded-lg border-t border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Total:</h2>
            <span className="text-gray-600 text-xl font-semibold">
              NRs. {total.toFixed(2)}
            </span>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Cart;
