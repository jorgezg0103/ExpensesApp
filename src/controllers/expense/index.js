
import { Expense } from '../../models/Expense.js';
import { findExpense } from './helper.js';

export const getExpenses = async (req, res) => {
	try {
		const expenses = await Expense.findAll({
			where: { userId: req.userId },
			order: [['date', 'DESC']],
		});

		res.json(expenses);
	} catch (error) {
		res.status(500).json({ message: 'Error getting expenses' });
	}
};

export const createExpense = async (req, res) => {
	try {
		const { amount, category, description, date } = req.body;

		const expense = await Expense.create({
			amount,
			category,
			description,
			date,
			userId: req.userId,
		});

		res.status(201).json(expense);
	} catch (error) {
		res.status(500).json({ message: 'Error creating expenses' });
	}
};

export const updateExpense = async (req, res) => {
	try {
		const { id } = req.params;

		const expense = await findExpense(id, req.userId);

		if (!expense) {
			return res.status(404).json({ message: 'Expense not found' });
		}

		await expense.update(req.body);

		res.json(expense);
	} catch (error) {
		res.status(500).json({ message: 'Error updating expense' });
	}
};

export const deleteExpense = async (req, res) => {
	try {
		const { id } = req.params;

		const expense = await findExpense(id, req.userId);

		if (!expense) {
			return res.status(404).json({ message: 'Expense not found' });
		}

		await expense.destroy();

		res.json({ message: 'Expense deleted' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting expense' });
	}
};
