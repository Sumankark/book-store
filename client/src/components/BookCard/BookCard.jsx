import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  return (
    <>
      <Link to={`/book-details/${data._id}`}>
        <div className="bg-zinc-600 text-zinc-100 rounded p-4 flex flex-col group-hover:opacity-75">
          <div className="bg-zinc-800 round flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
          <p className="mt-2 font-semibold text-zinc-300">by {data.author}</p>
          <p className="mt-2 font-semibold text-xl">Rs.{data.price}</p>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
