import { useState, useEffect } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Box
} from '@mui/material'

function EditExpenseDialog({ open, expense, onClose, onUpdate }) {

	const [amount, setAmount] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');

	useEffect(() => {
		if (expense) {
			setAmount(expense.amount);
			setCategory(expense.category);
			setDescription(expense.description);
			const formattedDate = expense.date.split('T')[0]
			setDate(formattedDate);
		}
	}, [expense]);

	const handleSubmit = (e) => {
		e.preventDefault()

		onUpdate({
			...expense,
			amount: Number(amount),
			category,
			description,
			date
		});
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>

			<DialogTitle>
				Edit Expense
			</DialogTitle>

			<DialogContent>

				<Box
					component='form'
					onSubmit={handleSubmit}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						mt: 1
					}}
				>

					<TextField
						label='Amount'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>

					<TextField
						label='Category'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
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
					/>

					<DialogActions>

						<Button onClick={onClose}>
							Cancel
						</Button>

						<Button
							type='submit'
							variant='contained'
						>
							Update
						</Button>

					</DialogActions>

				</Box>

			</DialogContent>

		</Dialog>
	);
}

export default EditExpenseDialog;