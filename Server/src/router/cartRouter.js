import { Router } from "express";
import {
  addToCart,
  getUserCart,
  removeFromCart,
} from "../controller/cartController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const cartRouter = Router();
cartRouter.route("/add-to-cart/:bookId").patch(isAuthenticated, addToCart);
cartRouter
  .route("/remove-from-cart/:bookId")
  .patch(isAuthenticated, removeFromCart);
cartRouter.route("/get-user-cart").get(isAuthenticated, getUserCart);

export default cartRouter;
