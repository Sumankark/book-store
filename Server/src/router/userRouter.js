import { Router } from "express";
import {
  createUser,
  Signin,
  updateDetail,
  userDetail,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const userRouter = Router();

userRouter.route("/").post(createUser);
userRouter.route("/signin").post(Signin);
userRouter.route("/user-detail").get(isAuthenticated, userDetail);
userRouter.route("/update-address").patch(isAuthenticated, updateDetail);

export default userRouter;
