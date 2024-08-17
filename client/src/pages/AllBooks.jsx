import React, { useEffect, useState } from "react";
import Loading from "../components/Loader/Loading";
import BookCard from "../components/BookCard/BookCard";
import axios from "axios";

const AllBooks = () => {
  const [book, setBook] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllBooks = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/books/read-all-books`
      );
      setBook(result.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllBooks();
  }, []);

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

  return (
    <div className="px-4 h-auto px-12 py-8">
      <h4 className="text-3xl text-zinc-800">All Books</h4>
      <div className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {book &&
          book.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
