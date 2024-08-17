import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loader/Loading";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="flex items-center justify-center my-8">
        <Loading />
      </div>
    );
  }

  if (!book) {
    return <p className="text-center mt-4">No book details available.</p>;
  }

  return (
    <div className="px-4 py-8 bg-zinc-100 flex flex-col md:flex-row gap-8">
      <div className="bg-zinc-200 rounded-lg p-4 w-full md:w-2/5 lg:w-1/2 flex items-center justify-center">
        <img
          src={book.url}
          alt={`Cover of ${book.title}`}
          className="h-auto max-h-[50vh] md:max-h-[70vh] max-w-full object-cover rounded-lg"
        />
      </div>
      <div className="w-full md:w-3/5 lg:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl text-zinc-800 font-semibold">
            {book.title}
          </h1>
          <p className="text-sm mt-2">
            by{" "}
            <span className="text-indigo-400 font-semibold">{book.author}</span>{" "}
            (Author)
          </p>
          <p className="text-2xl text-zinc-700 mt-4 font-semibold">
            Rs. {book.price}
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">{book.desc}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-zinc-600">
            <span className="font-semibold">Language:</span> {book.language}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
