import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import Loading from "../Loader/Loading";
import { hitApi } from "../../services/hitapi";

const RecentlyAdded = () => {
  const [book, setBook] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const recentAddedBook = async () => {
    try {
      const result = await hitApi.get(`/books/get-recent-add-books`);
      setBook(result.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    recentAddedBook();
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
    <div className="mt-4 px-4">
      <h4 className="text-3xl text-zinc-800">Recently Added Books</h4>
      <div className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {book &&
          book.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-600 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
