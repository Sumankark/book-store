import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createBook,
  deleteBook,
  getBookDetail,
  readAllBook,
  readRecentAddBook,
  upadteBook,
} from "../controller/bookContainer.js";

const bookRouter = Router();
bookRouter.route("/").post(isAuthenticated, createBook);
bookRouter.route("/:bookId").patch(isAuthenticated, upadteBook);
bookRouter.route("/:bookId").delete(isAuthenticated, deleteBook);
bookRouter.route("/read-all-books").get(readAllBook);
bookRouter.route("/get-recent-add-books").get(readRecentAddBook);
bookRouter.route("/get-book-detail/:bookId").get(getBookDetail);

export default bookRouter;
