import { Expense } from '../../models/Expense.js';

export const findExpense = async (expenseId, userId) => {
	return await Expense.findOne({
		where: { id: expenseId, userId },
	});
}