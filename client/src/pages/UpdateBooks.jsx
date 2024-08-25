import axios from "axios";
import React, { useState } from "react";

const UpdateBooks = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:8080/books", data, {
          headers,
        });
        alert(response.data.message);
      }
      // Reset form fields after submission
      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Update Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Image URL</label>
          <input
            type="text"
            name="url"
            value={data.url}
            onChange={change}
            placeholder="URL of image"
            className="border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Title of Book</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={change}
            placeholder="Title of book"
            className="border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Author of Book</label>
          <input
            type="text"
            name="author"
            value={data.author}
            onChange={change}
            placeholder="Author of book"
            className="border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="flex space-x-4 ">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={data.language}
              onChange={change}
              placeholder="Language of book"
              className="border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={change}
              placeholder="Price of book"
              className="border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Description of Book</label>
          <textarea
            name="desc"
            value={data.desc}
            onChange={change}
            rows="5"
            placeholder="Description of book"
            className="border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBooks;
