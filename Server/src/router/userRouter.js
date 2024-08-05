import { Router } from "express";
import {
  createUser,
  Signin,
  userDetail,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const userRouter = Router();

userRouter.route("/").post(createUser);
userRouter.route("/signin").post(Signin);
userRouter.route("/user-detail").get(isAuthenticated, userDetail);

export default userRouter;
