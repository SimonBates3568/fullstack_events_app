import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

  if (!authHeader) {
    return res.status(401).json({ message: 'You cannot access this operation without a token!' });
  }

  // Expect header format: "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing or malformed!' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token provided!' });
    }

    req.user = decoded;
    next();
  });
};

export default authMiddleware;
