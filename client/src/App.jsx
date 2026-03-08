import { useState } from 'react'
import Login from './pages/login'
import Dashboard from './pages/dashboard'

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem('token')
	)

	if (!isAuthenticated) {
		return <Login onLogin={() => setIsAuthenticated(true)} />
	}

	return <Dashboard />
}

export default App;