import { Expense } from '../../models/Expense.js';
import { findExpense } from './helper.js';
import { sequelize } from '../../config/database.js'
import { QueryTypes } from 'sequelize';

export const getExpensesService = async (userId) => {
	return await Expense.findAll({
		where: { userId: userId },
		order: [['date', 'DESC']],
	});
}

export const getMonthlySummaryService = async (userId, startDate, endDate) => {
	const today = new Date();
	const firstMonthOfYear = new Date(today.getFullYear(), 0, 1);

	const query = `
			SELECT
				date_trunc('month', date) AS "month",
				SUM(amount) AS "total"
			FROM public."Expenses"
			WHERE "userId" = :userId AND date BETWEEN :startDate AND :endDate
			GROUP BY "month"
			ORDER BY "month" DESC
		`;
	const replacements = {
		userId: userId,
		startDate: startDate ?? firstMonthOfYear.toISOString(),
		endDate: endDate ?? today.toISOString()
	}

	return await sequelize.query(query, { replacements, type: QueryTypes.SELECT });
};

export const getCategorySummaryService = async (userId, startDate, endDate) => {
	const today = new Date();
	const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

	const query = `
			SELECT
				category,
				SUM(amount) AS "total"
			FROM public."Expenses"
			WHERE "userId" = :userId AND date BETWEEN :startDate AND :endDate
			GROUP BY category
			ORDER BY "total" DESC
		`;
	const replacements = {
		userId: userId,
		startDate: startDate ?? firstDayOfMonth.toISOString(),
		endDate: endDate ?? today.toISOString()
	};

	return await sequelize.query(query, { replacements, type: QueryTypes.SELECT });
};

export const createExpenseService = async (userId, expense) => {
	const { amount, category, description, date } = expense;

	return await Expense.create({
		amount,
		category,
		description,
		date,
		userId: userId,
	});
};

export const updateExpenseService = async (userId, newExpenseFields) => {
	const currentExpense = await findExpense(newExpenseFields.id, userId);

	if (!currentExpense) {
		return null;
	}

	return await currentExpense.update(newExpenseFields);
};

export const deleteExpenseService = async (userId, expenseId) => {
	const expense = await findExpense(expenseId, userId);

	if (!expense) {
		return null;
	}

	return await expense.destroy();
};
