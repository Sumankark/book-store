import { Schema } from "mongoose";

const bookSchema = Schema(
  {
    url: {
      type: String,
      required: [true, "Url field is required"],
    },
    title: {
      type: String,
      required: [true, "Title field is required"],
    },
    author: {
      type: String,
      required: [true, "Author field is required"],
    },
    price: {
      type: Number,
      required: [true, "Price field is required"],
    },
    desc: {
      type: String,
      required: [true, "Description field is required"],
    },
    language: {
      type: String,
      required: [true, "Language field is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default bookSchema;
