import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
export const  verifyAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ error: 'Access denied. Token missing.' });
  }

  jwt.verify(token, process.env.ADMIN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.adminId = decoded.id;
    next();
  });
};

