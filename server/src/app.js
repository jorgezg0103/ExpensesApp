import express from 'express';
import cors from 'cors';
import { auth } from './routes/auth.js'
import { expense } from './routes/expense.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/expenses', expense);

app.get('/', (req, res) => {
	res.send('API working');
});

export { app };
