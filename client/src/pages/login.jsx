import { useState } from 'react'
import api from '../api/index'

function Login({ onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await api.post('/auth/login', {
			email,
			password
		});

		const token = response.data.token;

		localStorage.setItem('token', token);

		onLogin();
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>

			<input
				type="email"
				placeholder="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<input
				type="password"
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button type="submit">Login</button>
		</form>
	);
}

export default Login;
