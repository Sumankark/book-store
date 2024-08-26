import { Schema } from "mongoose";

const orderSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Out for delivery", "Delivered", "Canceled"],
    },
  },
  {
    timestamps: true,
  }
);

export default orderSchema;
