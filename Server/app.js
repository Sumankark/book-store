import express, { json } from "express";
import { port } from "./config.js";
import connectToMongoDB from "./src/connectToDB/connectToMongoDB.js";
import userRouter from "./src/router/userRouter.js";
import bookRouter from "./src/router/bookRouter.js";
import favouriteRouter from "./src/router/favouriteRouter.js";
import cartRouter from "./src/router/cartRouter.js";
import orderRouter from "./src/router/orderRouter.js";

const expressApp = express();

expressApp.listen(port, () => {
  console.log(`Express application is listening at port ${port}`);
});
expressApp.use(json());
connectToMongoDB();

expressApp.use("/users", userRouter);
expressApp.use("/books", bookRouter);
expressApp.use("/favourites", favouriteRouter);
expressApp.use("/cart", cartRouter);
expressApp.use("/orders", orderRouter);
