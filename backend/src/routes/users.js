import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middleware/auth.js";

const router = Router();
// GET /api/users
router.get("/", (req, res) => {
  const users = getUsers();
  res.json(users);
});
//  POST /api/users
router.post("/", auth, async(req, res) => {
  const { name, password, username, image } = req.body;
  const newUser = await createUser(username, name, password, image);
  res.status(201).json(newUser);
});
//  GET /api/users/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);

  if (!user) {
    res.status(404).json({ message: `User with id ${id} not found` });
  } else {
    res.status(200).json(user);
  }
});
// DELETE /api/users/:id
router.delete("/:id", auth, (req, res) => {
  const { id } = req.params;
  const user = deleteUserById(id);

  if (user) {
    res.status(200).send({
      message: `User with id ${id} successfully deleted`,
      user,
    });
  } else {
    res.status(404).json({
      message: `User with id ${id} not found`,
    });
  }
});
// PUT /api/users/:id
router.put("/:id", auth, (req, res) => {
  const { id } = req.params;
  const { name, password, username, image } = req.body;
  const user = updateUserById(id, { name, password, username, image });

  if (user) {
    res.status(200).send({
      message: `User with id ${id} successfully updated`,
      user,
    });
  } else {
    res.status(404).json({
      message: `User with id ${id} not found`,
    });
  }
});

export default router;
