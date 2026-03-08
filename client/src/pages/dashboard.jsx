import { useEffect, useState } from 'react'
import api from '../api/index'
import CreateExpenseForm from '../components/expenseForm';
import CreateExpenseTable from '../components/expenseTable';
import { Container } from '@mui/material'

function Dashboard() {

	const [expenses, setExpenses] = useState([])

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

	return (
		<Container>

			<CreateExpenseForm onExpenseCreated={handleExpenseCreated}></CreateExpenseForm>

			<CreateExpenseTable expenses={expenses} onDelete={handleDeleteExpense}></CreateExpenseTable>

		</Container>
	);
}

export default Dashboard;
