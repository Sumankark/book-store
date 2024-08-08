import { Router } from "express";
import {
  addToFavourite,
  getFavouriteBook,
  removeFromFavourite,
} from "../controller/favouriteController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const favouriteRouter = Router();
favouriteRouter
  .route("/add-to-favourite/:bookId")
  .patch(isAuthenticated, addToFavourite);
favouriteRouter
  .route("/remove-from-favourite/:bookId")
  .patch(isAuthenticated, removeFromFavourite);
favouriteRouter
  .route("/get-favourite-books")
  .get(isAuthenticated, getFavouriteBook);
export default favouriteRouter;
