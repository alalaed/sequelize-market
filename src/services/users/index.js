import { Router } from "express";
import { Product, Review, User } from "../../db/models/index.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const data = await User.findAll({
      include: Review,
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await User.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});

usersRouter.put("/:id", async (req, res, next) => {
  try {
    const result = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(result[1][0]);
  } catch (error) {
    console.log(error);
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = await User.destroy({ where: { id: req.params.id } });
    res.send({ rows });
  } catch (error) {
    console.log(error);
  }
});

export default usersRouter;
