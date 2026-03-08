import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';

function CreateExpenseTable({ expenses }) {
	return (
		<Paper sx={{ p: 3, mb: 4 }}>
			<Typography variant='h4' sx={{ mb: 4 }}> Your Expenses </Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell> Description </TableCell>
							<TableCell> Category </TableCell>
							<TableCell> Date </TableCell>
							<TableCell> Amount </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{expenses.map((expense) => (
							<TableRow key={expense.id}>
								<TableCell> {expense.description} </TableCell>
								<TableCell> {expense.category}</TableCell>
								<TableCell> {expense.date} </TableCell>
								<TableCell align='right'> {expense.amount} €</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}

export default CreateExpenseTable;
