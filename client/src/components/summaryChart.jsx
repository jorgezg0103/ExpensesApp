import { useEffect, useState } from 'react';
import api from '../api/index';
import { TextField, Button, Box } from '@mui/material'
import {
	BarChart,
	Bar,
	PieChart,
	Pie,
	Tooltip,
	Legend,
	ResponsiveContainer,
	XAxis,
	YAxis,
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

function CategoryChart(props) {

	const getThisMonthRange = () => {
		const now = new Date();

		const startDate = new Date(
			now.getFullYear(),
			now.getMonth(),
			1
		).toISOString().split('T')[0];

		const endDate = new Date().toISOString().split('T')[0];

		return { startDate, endDate };
	}

	const getSixMonthRange = () => {
		const now = new Date();

		const startDate = new Date(
			now.getFullYear(),
			now.getMonth() - 5,
			1
		).toISOString().split('T')[0];

		const endDate = new Date().toISOString().split('T')[0];

		return { startDate, endDate };
	}

	const pieInitialRange = getThisMonthRange();
	const barInitialRange = getSixMonthRange();

	const [data, setData] = useState([]);
	const [startDate, setStartDate] = useState(
		props.chartType === 'pie' ? pieInitialRange.startDate : barInitialRange.startDate
	);
	const [endDate, setEndDate] = useState(
		props.chartType === 'pie' ? pieInitialRange.endDate : barInitialRange.endDate
	);

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
			props.endpoint,
			{ params }
		);

		setData(res.data);
	}

	const parsedData = data.map((item, index) => ({
		...item,
		fill: COLORS[index % COLORS.length],
		...(item.month && { month: `${item.month.split('-')[0]}-${item.month.split('-')[1]}` })
	}));

	const setToday = () => {
		const now = new Date();
		setStartDate(now.toISOString().split('T')[0]);
		setEndDate(now.toISOString().split('T')[0]);
	}

	const setThisMonth = () => {
		const { startDate, endDate } = getThisMonthRange();
		setStartDate(startDate);
		setEndDate(endDate);
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
		<Paper sx={{ p: 3, mb: 4, minHeight: 500 }}>

			<Typography variant="h4" sx={{ mb: 3 }}>
				{props.title}
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
			{props.chartType === 'pie' &&
				<Box>
					<Button variant='outlined' sx={{ m: 1 }} onClick={setToday}>
						Today
					</Button>
					<Button variant='outlined' sx={{ m: 1 }} onClick={setThisMonth}>
						This month
					</Button>
					<Button variant='outlined' sx={{ m: 1 }} onClick={setLastMonth}>
						Last month
					</Button>
				</Box>
			}
			<ResponsiveContainer width="100%" height={300}>
				{props.chartType === 'pie' &&
					<PieChart>
						<Pie
							data={parsedData}
							dataKey="total"
							nameKey="category"
							outerRadius={100}
							label
						/>
						<Tooltip />
						<Legend />
					</PieChart>
				}
				{props.chartType === 'bar' &&
					<BarChart data={parsedData.reverse()}>
						<XAxis dataKey="month" />
						<YAxis dataKey="total" />
						<Tooltip />
						<Bar dataKey="total" />
					</BarChart>
				}
			</ResponsiveContainer>

		</Paper>
	);
}

export default CategoryChart;