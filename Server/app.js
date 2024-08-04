import express, { json } from "express";
import { port } from "./config.js";
import connectToMongoDB from "./src/connectToDB/connectToMongoDB.js";
import userRouter from "./src/router/userRouter.js";

const expressApp = express();

expressApp.listen(port, () => {
  console.log(`Express application is listening at port ${port}`);
});
expressApp.use(json());
connectToMongoDB();

expressApp.use("/users", userRouter);
