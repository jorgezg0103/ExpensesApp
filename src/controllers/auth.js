import bcrypt from 'bcrypt';
import { User } from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'

const register = async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ where: { email } });

		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			email,
			password: hashedPassword,
		});

		const token = generateToken(user.id);

		res.status(201).json({
			id: user.id,
			email: user.email,
			token,
		});

	} catch (error) {
		res.status(500).json({ message: 'Register error' });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });
		const isMatch = await bcrypt.compare(password, user.password);

		if (!user || !isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = generateToken(user.id);

		res.json({
			id: user.id,
			email: user.email,
			token,
		});

	} catch (error) {
		res.status(500).json({ message: 'Login error' });
	}
};

export { register, login };