import { User } from "../schema/model.js";

export const addToFavourite = async (req, res) => {
  try {
    const userId = req._id;
    const { bookId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isBookFavourite = user.favourites.includes(bookId);
    if (isBookFavourite) {
      return res.status(200).json({
        success: true,
        message: "Book is already in favourites",
      });
    }
    await User.findByIdAndUpdate(userId, { $push: { favourites: bookId } });
    res.status(200).json({
      success: true,
      message: "Book added to favourites successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFromFavourite = async (req, res) => {
  try {
    const userId = req._id;
    const { bookId } = req.params;

    const user = await User.findById(userId);
    if (user.favourites.includes(bookId)) {
      await User.findByIdAndUpdate(userId, { $pull: { favourites: bookId } });

      res.status(200).json({
        success: true,
        message: "Book removed form favourites Successfully.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Book not found in favourites.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFavouriteBook = async (req, res) => {
  try {
    const userId = req._id;
    const user = await User.findById(userId).populate("favourites");
    const favouriteBook = user.favourites;
    res.status(200).json({
      success: true,
      data: favouriteBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
