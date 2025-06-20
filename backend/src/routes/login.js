import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = jwt.sign({ userId: user.id }, secretKey);

  // Return user info along with token
  res.status(200).json({
    message: "Successfully logged in!",
    token,
    user: {
      username: user.username,
      image: user.image
    }
  });
});

export default router;
