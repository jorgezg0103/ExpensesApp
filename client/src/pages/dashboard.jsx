import { useEffect, useState } from 'react'
import api from '../api/index'
import CreateExpenseForm from '../components/expenseForm';

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
		<div>

			<CreateExpenseForm onExpenseCreated={handleExpenseCreated}></CreateExpenseForm>

			<h2>Your Expenses</h2>
			<ul>
				{expenses.map(expense => (
					<li key={expense.id}>
						{expense.category} - €{expense.amount}
					</li>
				))}
			</ul>

		</div>
	);
}

export default Dashboard;
