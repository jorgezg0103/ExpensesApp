import express from 'express';
import auth from '../middleware/auth.js';
import {
	getExpenses,
	getCategorySummary,
	getMonthlySummary,
	createExpense,
	updateExpense,
	deleteExpense
} from '../controllers/expense/index.js';

const router = express.Router();

router.use(auth);

router.get('/', getExpenses);
router.get('/summary/category', getCategorySummary);
router.get('/summary/month', getMonthlySummary);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export { router as expense };
