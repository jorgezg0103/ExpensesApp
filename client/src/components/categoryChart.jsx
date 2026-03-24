import { useEffect, useState } from 'react';
import api from '../api/index';

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

	useEffect(() => {
		const fetchSummary = async () => {
			const res = await api.get('/expenses/summary/category');
			setData(res.data);
		}

		fetchSummary();
	}, []);

	const coloredData = data.map((item, index) => ({
		...item,
		fill: COLORS[index % COLORS.length]
	}));

	return (
		<Paper sx={{ p: 3, mb: 4 }}>

			<Typography variant="h4" sx={{ mb: 2 }}>
				Expenses by Category
			</Typography>

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