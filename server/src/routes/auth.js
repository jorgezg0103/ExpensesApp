import express from 'express'
import authMiddleware from '../middleware/auth.js';
import { register, login } from '../controllers/auth.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export { router as auth };
