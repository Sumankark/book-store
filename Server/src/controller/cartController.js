import { User } from "../schema/model.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req._id;
    const { bookId } = req.params;

    const user = await User.findById(userId);
    const isBookInCart = user.cart.includes(bookId);
    if (isBookInCart) {
      return res.status(200).json({
        success: false,
        message: "Book is already in cart.",
      });
    }
    await User.findByIdAndUpdate(userId, { $push: { cart: bookId } });
    res.status(200).json({
      success: true,
      message: "Book added to cart",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req._id;
    const { bookId } = req.params;

    await User.findByIdAndUpdate(userId, { $pull: { cart: bookId } });
    res.status(200).json({
      success: true,
      message: "Book removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req._id;

    const user = await User.findById(userId).populate("cart");
    const cart = user.cart.reverse();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
