import express from "express";
import { Review, Product, Category } from "../../db/models/index.js";

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res, next) => {
  try {
    const data = await Category.findAll({});
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

categoryRouter.post("/", async (req, res, next) => {
  try {
    const data = await Category.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

categoryRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

categoryRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    res.send(data[1][0]);
  } catch (error) {
    console.log(error);
  }
});
categoryRouter.delete("/:id", async (req, res, next) => {
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.send({ rows: data });
  } catch (error) {
    console.log(error);
  }
});

export default categoryRouter;
