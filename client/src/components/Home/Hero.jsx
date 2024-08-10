import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const images = ["hero1.png", "hero2.png", "hero3.png", "hero4.png"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div
      className="h-[75vh] flex relative"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="w-full  flex flex-col items-center justify-center px-10">
        <h1 className="text-4xl lg:text-6xl font-semibold text-zinc-300 text-center lg:text-left">
          Your Journey Begins with a Book
        </h1>
        <p className="mt-4 text-xl text-center text-zinc-200">
          Explore thousands of books at unbeatable prices. Whether you're into
          friction, non-friction, or anything in between, we've got something
          for everyone.
        </p>
        <Link to="/all-books" className="mt-8">
          <button className="text-zinc-300 text-2xl font-semibold  border border-zinc-100 px-10 py-3 hover:bg-zinc-700 hover:text-white rounded-full">
            Discover Books
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
