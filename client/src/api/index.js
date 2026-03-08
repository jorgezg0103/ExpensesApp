import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:5000/api',
	// WIP Temporal solution to 401
	headers: {
		Authorization: 'Bearer <TOKEN>'
	}
})

export default api
