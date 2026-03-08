import { useState } from 'react'
import api from '../api/index'

function CreateExpenseForm({ onExpenseCreated }) {
	const [amount, setAmount] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newExpense = {
			amount: Number(amount),
			category,
			description,
			date
		}

		const response = await api.post('/expenses', newExpense);

		onExpenseCreated(response.data);

		setAmount('');
		setCategory('');
		setDescription('');
		setDate('');
	}

	return (
		<form onSubmit={handleSubmit}>
			<h3>Add Expense</h3>

			<input
				type="number"
				placeholder="Amount"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				required
			/>

			<input
				type="text"
				placeholder="Category"
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				required
			/>

			<input
				type="text"
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>

			<input
				type="date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				required
			/>

			<button type="submit">Add</button>
		</form>
	);
}

export default CreateExpenseForm;
