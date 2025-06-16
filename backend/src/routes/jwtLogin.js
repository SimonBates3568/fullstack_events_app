import { Router } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);// Get the current module's file name
const __dirname = path.dirname(__filename);// Get the directory name of the current module

const userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8'));// Read user data from JSON file

const router = Router();// Create a new router instance

router.post('/', (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';
  const { username, password } = req.body;
  const { users } = userData;
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  }

  const token = jwt.sign({ userId: user.id }, secretKey);
  res.status(200).json({ message: 'Successfully logged in!', token });
});// Handle POST requests to /login

export default router;