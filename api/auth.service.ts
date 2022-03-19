import axios from 'axios';

const login = async ({ email, password }) => {
	try {
		const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
			email,
			password,
		});
		localStorage.setItem('token', res.data.token);
		localStorage.setItem('user', res.data.user.name);
		localStorage.setItem('userId', res.data.user.userId);
		return res.data;
	} catch (error) {
		return { error: error.response };
	}
};

const register = async ({ name, email, password }) => {
	try {
		const res = await axios.post(`${process.env.REACT_APP_API}/auth/register`, {
			name,
			email,
			password,
		});
		localStorage.setItem('token', res.data.token);
		localStorage.setItem('user', res.data.user.name);
		localStorage.setItem('userId', res.data.user.userId);
		return await res.data;
	} catch (error) {
		return { error: error.response };
	}
};

const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	localStorage.removeItem('userId');
	return;
};

const authServices = { login, register, logout };

export default authServices;
