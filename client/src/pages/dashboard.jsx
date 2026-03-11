import { useEffect, useState } from 'react'
import api from '../api/index'
import CreateExpenseForm from '../components/expenseForm';
import CreateExpenseTable from '../components/expenseTable';
import { Container } from '@mui/material'
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
		<Container>

			<CreateExpenseForm onExpenseCreated={handleExpenseCreated}></CreateExpenseForm>

			<CreateExpenseTable expenses={expenses} onDelete={handleDeleteExpense} onEdit={handleEditExpense}></CreateExpenseTable>

			<EditExpenseDialog
				open={!!editingExpense}
				expense={editingExpense}
				onClose={() => setEditingExpense(null)}
				onUpdate={handleUpdateExpense}
			/>
		</Container>
	);
}

export default Dashboard;
