import { Order, User } from "../schema/model.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req._id;
    const { order } = req.body;

    if (!Array.isArray(order)) {
      return res.status(400).json({
        success: false,
        message: "Order must be an array.",
      });
    }

    for (const orderData of order) {
      const newOrder = new Order({ user: userId, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      await User.findByIdAndUpdate(userId, {
        $push: { orders: orderDataFromDb._id },
      });

      await User.findByIdAndUpdate(userId, {
        $pull: { cart: orderData._id },
      });
    }

    res.json({
      success: true,
      message: "Order placed successfully.",
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const userId = req._id;

    const user = await User.findById(userId).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const orderData = user.orders.reverse();
    res.json({
      status: true,
      data: orderData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const user = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "Order Placed",
      "Out for delivery",
      "Delivered",
      "Canceled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.json({
      success: true,
      message: "Status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error occurred",
    });
  }
};
