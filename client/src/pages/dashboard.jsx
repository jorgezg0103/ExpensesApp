import { useEffect, useState } from 'react'
import api from '../api/index'
import SummaryChart from '../components/summaryChart';
import CreateExpenseForm from '../components/expenseForm';
import CreateExpenseTable from '../components/expenseTable';
import { Grid, Typography } from '@mui/material';
import EditExpenseDialog from '../components/editExpenseDialog';

function Dashboard() {

	const [expenses, setExpenses] = useState([]);
	const [editingExpense, setEditingExpense] = useState(null);

	useEffect(() => {
		fetchExpenses()
	}, []);

	const fetchExpenses = async () => {
		const response = await api.get('/expenses');
		setExpenses(response.data);
	}

	const handleExpenseCreated = (expense) => {
		setExpenses((previous) => [expense, ...previous]);
	}

	const handleDeleteExpense = async (id) => {
		await api.delete(`/expenses/${id}`);
		setExpenses((previous) => previous.filter(e => e.id !== id));
	}

	const handleEditExpense = (expense) => {
		setEditingExpense(expense);
	}

	const handleUpdateExpense = async (updatedExpense) => {
		const res = await api.put(
			`/expenses/${updatedExpense.id}`,
			updatedExpense
		);
		setExpenses(prev =>
			prev.map(e =>
				e.id === updatedExpense.id ? res.data : e
			)
		);
		setEditingExpense(null);
	}

	return (
		<>
			<Grid>

				<Grid size={12} sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
					<Typography variant='h1'> Expenses App</Typography>
				</Grid>

				<Grid size={12}>
					<CreateExpenseForm onExpenseCreated={handleExpenseCreated}></CreateExpenseForm>
				</Grid>

				<Grid container spacing={2}>
					<Grid size={6}>
						<SummaryChart title='Expenses by Category' endpoint='/expenses/summary/category' chartType='pie' />
					</Grid>
					<Grid size={6}>
						<SummaryChart title='Expenses by Month' endpoint='/expenses/summary/month' chartType='bar' />
					</Grid>
				</Grid>

				<Grid>
					<CreateExpenseTable expenses={expenses} onDelete={handleDeleteExpense} onEdit={handleEditExpense}></CreateExpenseTable>
				</Grid>

			</Grid>

			<EditExpenseDialog
				open={!!editingExpense}
				expense={editingExpense}
				onClose={() => setEditingExpense(null)}
				onUpdate={handleUpdateExpense}
			/>
		</>
	);
}

export default Dashboard;
