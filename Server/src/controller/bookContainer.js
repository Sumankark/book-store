import { Book, User } from "../schema/model.js";

export const createBook = async (req, res) => {
  try {
    const id = req._id;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "Only admin can add books.",
      });
    }
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    await book.save();
    res.status(200).json({
      success: true,
      message: "Book added Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const upadteBook = async (req, res) => {
  try {
    const userId = req._id;
    const { bookId } = req.params;
    const user = await User.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can update books.",
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book updated Successfully!",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const userId = req._id;
    const { bookId } = req.params;
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can delete book.",
      });
    }
    const deleteBook = await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book delete Successfully.",
      result: deleteBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Inertnal server error!",
    });
  }
};

export const readAllBook = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Read all data successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const readRecentAddBook = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json({
      success: true,
      message: "Read all data successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookDetail = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
