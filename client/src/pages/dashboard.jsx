import { useEffect, useState } from 'react'
import api from '../api/index'
import CreateExpenseForm from '../components/expenseForm';
import { Container, Typography } from '@mui/material'

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

	return (
		<Container>

			<CreateExpenseForm onExpenseCreated={handleExpenseCreated}></CreateExpenseForm>

			<Typography variant='h4' sx={{ mb: 4 }}> Your Expenses </Typography>
			<ul>
				{expenses.map(expense => (
					<li key={expense.id}>
						{expense.description} - {expense.category} - {expense.date} - {expense.amount}€
					</li>
				))}
			</ul>

		</Container>
	);
}

export default Dashboard;
