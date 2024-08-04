import { model } from "mongoose";
import userSchema from "./userSchema.js";
import orderSchema from "./orderSchema.js";
import bookSchema from "./bookSchema.js";

export const User = model("User", userSchema);

export const Order = model("Order", orderSchema);

export const Book = model("Book", bookSchema);
