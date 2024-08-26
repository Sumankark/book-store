import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  getAllOrders,
  getOrderHistory,
  placeOrder,
  updateOrderStatus,
} from "../controller/orderController.js";

const orderRouter = Router();
orderRouter.route("/place-order").post(isAuthenticated, placeOrder);
orderRouter.route("/get-order-history").get(isAuthenticated, getOrderHistory);
orderRouter.route("/get-all-orders").get(isAuthenticated, getAllOrders);
orderRouter
  .route("/update-status/:id")
  .patch(isAuthenticated, updateOrderStatus);

export default orderRouter;
