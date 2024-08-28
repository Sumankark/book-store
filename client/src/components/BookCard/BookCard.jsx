import React from "react";
import { Link } from "react-router-dom";
import { hitApi } from "../../services/hitapi";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookId: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await hitApi.patch(
        `/favourites/remove-from-favourite/${data._id}`,
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full bg-zinc-600 text-zinc-100 rounded-lg p-4">
      <Link to={`/book-details/${data._id}`}>
        <div className="flex-grow">
          <div className="flex items-center justify-center">
            <img
              src={data.url}
              alt={data.title}
              className="h-[25vh] w-full object-cover rounded-lg"
            />
          </div>
          <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
          <p className="mt-2 font-semibold text-zinc-300">by {data.author}</p>
          <p className="mt-2 font-semibold text-xl">Rs. {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <div className="mt-4">
          <button
            className="w-full bg-zinc-300 px-4 py-2 rounded border border-yellow-800 text-yellow-800"
            onClick={handleRemoveBook}
          >
            Remove from favourite
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
