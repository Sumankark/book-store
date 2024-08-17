import { Schema } from "mongoose";

const userSchema = Schema(
  {
    userName: {
      type: String,
      required: [true, "UserName field is required"],
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
    },
    address: {
      type: String,
      required: [true, "Address field is required"],
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    favourites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    isVerifiedEmail: {
      type: String,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export default userSchema;
