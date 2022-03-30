import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import 'dotenv/config';

type loginProps = {
	email: string;
	password: string;
};

type registerProps = {
	email: string;
	username: string;
	password: string;
};

const login = async ({ email, password }: loginProps) => {
	try {
		const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
			email,
			password,
		});

		await SecureStore.setItemAsync('token', res.data.token);
		await SecureStore.setItemAsync('user', res.data.user.name);
		await SecureStore.setItemAsync('userId', res.data.user.userId);
		return res.data;
	} catch (error: any) {
		return error;
	}
};

const register = async ({ username, email, password }: registerProps) => {
	try {
		const res = await axios.post(`${process.env.REACT_APP_API}/auth/register`, {
			name: username,
			email,
			password,
		});
		await SecureStore.setItemAsync('token', res.data.token);
		await SecureStore.setItemAsync('user', res.data.user.name);
		await SecureStore.setItemAsync('userId', res.data.user.userId);
		return await res.data;
	} catch (error: any) {
		return { error: error.response };
	}
};

const logout = async () => {
	await SecureStore.deleteItemAsync('token');
	await SecureStore.deleteItemAsync('user');
	await SecureStore.deleteItemAsync('userId');
	return;
};

const authServices = { login, register, logout };

export default authServices;
