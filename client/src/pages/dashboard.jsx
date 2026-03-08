import { useEffect, useState } from 'react'
import api from '../api/index'

function Dashboard() {

	const [expenses, setExpenses] = useState([])

	useEffect(() => {
		const fetchExpenses = async () => {
			const response = await api.get('/expenses')
			setExpenses(response.data)
		}

		fetchExpenses()
	}, [])

	return (
		<div>
			<h2>Your Expenses</h2>

			<ul>
				{expenses.map(expense => (
					<li key={expense.id}>
						{expense.category} - €{expense.amount}
					</li>
				))}
			</ul>

		</div>
	)
}

export default Dashboard;
