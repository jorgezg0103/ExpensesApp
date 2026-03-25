import { useEffect, useState } from 'react';
import api from '../api/index';
import { TextField, Button, Box } from '@mui/material'
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts'

import { Paper, Typography } from '@mui/material'

const COLORS = [
	'#0088FE',
	'#00C49F',
	'#FFBB28',
	'#FF8042',
	'#AA66CC',
	'#FF4444'
];

function CategoryChart() {

	const [data, setData] = useState([]);
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')

	useEffect(() => {
		fetchSummary();
	}, [startDate, endDate]);

	const fetchSummary = async () => {
		const params = {};

		if (startDate && endDate) {
			params.startDate = startDate;
			params.endDate = endDate;
		}

		const res = await api.get(
			'/expenses/summary/category',
			{ params }
		);

		setData(res.data);
	}

	const coloredData = data.map((item, index) => ({
		...item,
		fill: COLORS[index % COLORS.length]
	}));

	const setToday = () => {
		const now = new Date();
		setStartDate(now.toISOString().split('T')[0]);
		setEndDate(now.toISOString().split('T')[0]);
	}

	const setThisMonth = () => {
		const now = new Date();

		const start = new Date(
			now.getFullYear(),
			now.getMonth(),
			1
		);

		const end = new Date();

		setStartDate(start.toISOString().split('T')[0]);
		setEndDate(end.toISOString().split('T')[0]);
	}

	const setLastMonth = () => {
		const now = new Date();
		const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

		const lastDayLastMonth = new Date(firstDayThisMonth - 1);

		const firstDayLastMonth = new Date(lastDayLastMonth.getFullYear(), lastDayLastMonth.getMonth(), 1);

		setStartDate(firstDayLastMonth.toISOString().split('T')[0]);
		setEndDate(lastDayLastMonth.toISOString().split('T')[0]);
	}

	return (
		<Paper sx={{ p: 3, mb: 4 }}>

			<Typography variant="h4" sx={{ mb: 2 }}>
				Expenses by Category
			</Typography>

			<Box
				sx={{
					display: 'flex',
					gap: 2,
					mb: 2,
					alignItems: 'center'
				}}
			>

				<TextField
					label="Start"
					type="date"
					slotProps={{ inputLabel: { shrink: true } }}
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>

				<TextField
					label="End"
					type="date"
					slotProps={{ inputLabel: { shrink: true } }}
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
				/>

				<Button
					variant="contained"
					onClick={fetchSummary}
				>
					Apply
				</Button>

			</Box>
			<Button onClick={setToday}>
				Today
			</Button>
			<Button onClick={setThisMonth}>
				This month
			</Button>
			<Button onClick={setLastMonth}>
				Last month
			</Button>

			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={coloredData}
						dataKey="total"
						nameKey="category"
						outerRadius={100}
						label
					/>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>

		</Paper>
	);
}

export default CategoryChart;