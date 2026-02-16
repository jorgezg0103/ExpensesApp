import express from 'express';
import cors from 'cors';
import { auth } from './routes/auth.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);

app.get('/', (req, res) => {
	res.send('API working');
});

export { app };
