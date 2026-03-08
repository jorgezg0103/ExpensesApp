import {
	createExpenseService,
	deleteExpenseService,
	getCategorySummaryService,
	getExpensesService,
	getMonthlySummaryService,
	updateExpenseService
} from '../../services/expense/index.js';

export const getExpenses = async (req, res) => {
	try {
		const result = await getExpensesService(req.userId);

		res.json(result);
	} catch (error) {
		res.status(500).json({ message: 'Error getting expenses' });
	}
};

export const getMonthlySummary = async (req, res) => {
	try {
		const { startDate, endDate } = req.query;

		const result = await getMonthlySummaryService(req.userId, startDate, endDate);

		res.json(result);
	} catch (error) {
		res.status(500).json({ message: 'Error getting monthly summary' });
	}
};

export const getCategorySummary = async (req, res) => {
	try {
		const { startDate, endDate } = req.query;

		const result = await getCategorySummaryService(req.userId, startDate, endDate);

		res.json(result);
	} catch {
		res.status(500).json({ message: 'Error getting category summary' });
	}
}

export const createExpense = async (req, res) => {
	try {
		const result = await createExpenseService(req.userId, req.body);

		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ message: 'Error creating expenses' });
	}
};

export const updateExpense = async (req, res) => {
	try {
		const { id } = req.params;

		const result = await updateExpenseService(req.userId, { id, ...req.body });

		if (!result) {
			res.status(404).json({ message: 'Expense not found' });
		}

		res.json(result);
	} catch (error) {
		res.status(500).json({ message: 'Error updating expense' });
	}
};

export const deleteExpense = async (req, res) => {
	try {
		const { id } = req.params;

		const result = await deleteExpenseService(req.userId, id);

		if (!result) {
			return res.status(404).json({ message: 'Expense not found' });
		}

		res.json({ message: 'Expense deleted' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting expense' });
	}
};
