import express from 'express';
import cors from 'cors';
import { router } from './routes/auth.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use('api/auth', router)

app.get('/', (req, res) => {
	res.send('API working');
});

export { app };
