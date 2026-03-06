
import { Expense } from '../../models/Expense.js';
import { findExpense } from './helper.js';
import { sequelize } from '../../config/database.js'
import { QueryTypes } from 'sequelize';

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

export const getMonthlySummary = async (req, res) => {
	try {
		const replacements = { userId: req.userId }
		const summary = await sequelize.query(`
			SELECT
				date_trunc('month', date) AS "month",
				SUM(amount) AS "total"
			FROM public."Expenses"
			WHERE "userId" = :userId
			GROUP BY "month"
			ORDER BY "month" DESC
		`, { replacements, type: QueryTypes.SELECT });
		res.json(summary);
	} catch {
		res.status(500).json({ message: 'Error getting monthly summary' });
	}
};

export const getCategorySummary = async (req, res) => {
	try {
		const { startDate, endDate } = req.query;
		const today = new Date();
		const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

		let query = `
			SELECT
				category,
				SUM(amount) AS "total"
			FROM public."Expenses"
			WHERE "userId" = :userId
		`;

		const replacements = {
			userId: req.userId
		};

		query += ` AND date BETWEEN :startDate AND :endDate`;
		replacements.startDate = startDate ?? firstDayOfMonth.toISOString();
		replacements.endDate = endDate ?? today.toISOString();

		query += `
			GROUP BY category
			ORDER BY "total" DESC
		`;

		const summary = await sequelize.query(query, { replacements, type: QueryTypes.SELECT });
		res.json(summary);
	} catch {
		res.status(500).json({ message: 'Error getting category summary' });
	}
}

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
