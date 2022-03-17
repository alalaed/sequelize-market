import express from "express";
import sequelize, { testDB } from "./db/index.js";
import productRouter from "./services/product/index.js";
import reviewsRouter from "./services/reviews/index.js";
import usersRouter from "./services/users/index.js";
import categoryRouter from "./services/categories/index.js";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/product", productRouter);
server.use("/reviews", reviewsRouter);
server.use("/categories", categoryRouter);
server.use("/users", usersRouter);

server.listen(process.env.PORT || 3001, async () => {
  console.log("server is running on port ", process.env.PORT || 3001);
  await testDB();
  sequelize
    .sync()
    .then(() => {
      console.log("DB connected");
    })
    .catch((e) => {
      console.log(e);
    });
});
