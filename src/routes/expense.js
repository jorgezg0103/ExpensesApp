import express from 'express';
import auth from '../middleware/auth.js';
import {
	getExpenses,
	createExpense,
	updateExpense,
	deleteExpense
} from '../controllers/expense/index.js';

const router = express.Router();

router.use(auth);

router.get('/', getExpenses);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export { router as expense };
