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

	return (
		<Container>

			<CreateExpenseForm onExpenseCreated={handleExpenseCreated}></CreateExpenseForm>

			<CreateExpenseTable expenses={expenses}></CreateExpenseTable>

		</Container>
	);
}

export default Dashboard;
