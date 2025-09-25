import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'default-secret');
};

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const userId = (user as any)._id.toString();
  return res.json({ token: generateToken(userId) });
});

export default router;
