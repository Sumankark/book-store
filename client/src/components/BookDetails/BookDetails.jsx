import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loader/Loading";
import axios from "axios";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const fetchBookDetails = useCallback(async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/books/get-book-detail/${id}`
      );
      setBook(result.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  if (error) {
    return <p className="text-red-600 text-center mt-4">Error: {error}</p>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );
  }

  if (!book) {
    return <p className="text-center mt-4">No book details available.</p>;
  }

  const handleFavourate = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/favourites/add-to-favourite/${id}`,
        {},
        {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(
        "Error adding to favourites:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/cart/add-to-cart/${id}`,
        {},
        {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(
        "Error adding to favourites:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/books/${id}`, {
        headers,
      });
      alert(response.data.message);
      navigate("/all-books");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className=" mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 mt-12">
      <div className="px">
        <div className="flex  rounded-lg items-center justify-center md:items-start bg-white shadow-lg gap-6 p-4 ">
          <img
            src={book.url}
            alt={`Cover of ${book.title}`}
            className="h-auto max-h-[60vh] object-cover rounded-lg mb-4"
          />
          {isLoggedIn === true && role === "user" && (
            <div className="flex flex-col">
              <button
                className="bg-zinc-300 rounded-full text-3xl p-2 text-red-500"
                onClick={handleFavourate}
              >
                <FaHeart />
              </button>
              <button
                className="bg-zinc-300 rounded-full text-3xl p-2 mt-4 text-blue-500"
                onClick={handleCart}
              >
                <FaShoppingCart />
              </button>
            </div>
          )}
          {isLoggedIn === true && role === "admin" && (
            <div className="flex flex-col">
              <Link
                to={`/update-book/${id}`}
                className="bg-zinc-300 rounded-full text-3xl p-2 text-black-500"
              >
                <FaEdit />
              </Link>
              <button
                className="bg-zinc-300 rounded-full text-3xl p-2 mt-4 text-red-500"
                onClick={handleDelete}
              >
                <MdDelete />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between bg-white shadow-lg rounded-lg p-6">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">{book.title}</h1>
          <p className="text-lg mt-2 text-gray-600">
            by{" "}
            <span className="text-indigo-500 font-semibold">{book.author}</span>{" "}
            (Author)
          </p>
          <p className="text-2xl font-bold text-gray-700 mt-4">
            Rs. {book.price}
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">{book.desc}</p>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>
            <span className="font-semibold">Language:</span> {book.language}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
