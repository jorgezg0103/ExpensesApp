import { useState } from 'react'
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton';
import ConfirmDialog from './confirmDialog';

function CreateExpenseTable({ expenses, onDelete, onEdit }) {

	const [openDialog, setOpenDialog] = useState(false)
	const [selectedId, setSelectedId] = useState(null)

	const handleDeleteClick = (id) => {
		setSelectedId(id);
		setOpenDialog(true);
	}

	const confirmDelete = () => {
		onDelete(selectedId);
		setOpenDialog(false);
	}

	const handleClose = () => {
		setOpenDialog(false);
	}

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
							<TableCell align='right'> Amount </TableCell>
							<TableCell align="center"> Actions </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{expenses.map((expense) => (
							<TableRow key={expense.id}>
								<TableCell> {expense.description} </TableCell>
								<TableCell> {expense.category}</TableCell>
								<TableCell> {new Date(expense.date).toLocaleDateString()} </TableCell>
								<TableCell align='right'> {expense.amount} €</TableCell>
								<TableCell align="center">
									<IconButton
										color="primary"
										onClick={() => onEdit(expense)}
									>
										<EditIcon />
									</IconButton>
									<IconButton
										color="info"
										onClick={() => handleDeleteClick(expense.id)}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<ConfirmDialog
				open={openDialog}
				title={"Delete expense"}
				message={"Are you sure you want to delete this expense?"}
				onConfirm={confirmDelete}
				onCancel={handleClose}
			>
			</ConfirmDialog>
		</Paper>
	);
}

export default CreateExpenseTable;
