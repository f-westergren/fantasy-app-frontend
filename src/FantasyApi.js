import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class FantasyApi {
	static async request(endpoint, paramsOrData = {}, verb = 'get') {
		paramsOrData._token = localStorage.getItem('token');

		try {
			return (await axios({
				method: verb,
				url: `${BASE_URL}/${endpoint}`,
				[verb === 'get' ? 'params' : 'data']: paramsOrData
			})).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	static async login(email, password) {
		const res = await this.request('login', { email, password }, 'post');
		return res;
	}

	static async getUser(id) {
		const res = await this.request(`users/${id}`);
		return res;
	}

	static async createUser(data) {
		const res = await this.request('users', data, 'post');
		return res;
	}

	static async updateUser(id, data) {
		const res = await this.request(`users/${id}`, data, 'patch');
		return res;
	}

	static async deleteUser(id) {
		const res = await this.request(`users/${id}`, {}, 'delete');
		return res;
	}
}

export default FantasyApi;
