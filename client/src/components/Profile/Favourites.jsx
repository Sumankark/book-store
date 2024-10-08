import React, { useEffect, useState, useMemo } from "react";
import BookCard from "../BookCard/BookCard";
import { hitApi } from "../../services/hitapi";

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize headers to avoid unnecessary re-renders
  const headers = useMemo(
    () => ({
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    []
  );

  useEffect(() => {
    const fetchFavouriteBooks = async () => {
      try {
        const response = await hitApi.get("/favourites/get-favourite-books", {
          headers,
        });
        setFavouriteBooks(response.data.data);
      } catch (error) {
        setError("Error fetching favourite books. Please try again later.");
        console.error("Error fetching favourite books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavouriteBooks();
  }, [headers]); // Add headers to the dependency array if needed

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 mt-10">
      <h1 className="text-3xl font-bold mb-6">Favourite Books</h1>

      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favouriteBooks.length > 0 ? (
            favouriteBooks.map((item) => (
              <div
                key={item.id} // Assuming item has a unique id property
                className="bg-zinc-600 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <BookCard data={item} favourite={true} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 text-xl">
              No favourite books found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Favourites;
