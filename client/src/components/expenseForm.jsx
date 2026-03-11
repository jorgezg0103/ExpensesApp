import { useState } from 'react'
import api from '../api/index'
import {
	Box,
	TextField,
	Button,
	Typography,
	Paper
} from '@mui/material'

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
		<Paper sx={{ p: 3, mb: 4 }}>
			<Typography variant='h6'>
				Add Expense
			</Typography>
			<Box
				component='form'
				onSubmit={handleSubmit}
				sx={{
					display: 'flex',
					gap: 2,
					flexWrap: 'wrap'
				}}
			>

				<TextField
					label='Amount'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
				/>

				<TextField
					label='Category'
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					required
				/>

				<TextField
					label='Description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<TextField
					label='Date'
					type='date'
					slotProps={{ inputLabel: { shrink: true } }}
					value={date}
					onChange={(e) => setDate(e.target.value)}
					required
				/>

				<Button
					type='submit'
					variant='contained'
				>
					Add expense
				</Button>

			</Box>
		</Paper>
	);
}

export default CreateExpenseForm;
