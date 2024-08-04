import { Router } from "express";
import { createUser } from "../controller/userController.js";

const userRouter = Router();

userRouter.route("/").post(createUser);

export default userRouter;
