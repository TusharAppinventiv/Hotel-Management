import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const verifyAdminOrUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ error: 'Access denied. Token missing.' });
  }

  jwt.verify(token, process.env.ADMIN_KEY, (adminErr, adminDecoded) => {
    if (!adminErr) {
      req.adminId = adminDecoded.id;
      return next(); // Allow access if admin token is valid
    }

    jwt.verify(token, process.env.USER_KEY, (userErr, userDecoded) => {
      if (userErr) {
        return res.status(401).json({ error: 'Invalid token.' });
      }
      
      req.userId = userDecoded.id;
      next(); 
    });
  });
};
