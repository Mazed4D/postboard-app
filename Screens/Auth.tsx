import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import authServices from '../api/auth.service';

type AuthProps = {
	setReload: any;
	reload: boolean;
};

export default function Auth({ setReload, reload }: AuthProps) {
	const [email, setEmail] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isRegister, setIsRegister] = useState<boolean>(false);

	const authHandler = async () => {
		if (isRegister) {
			await authServices.register({ username, email, password });
		} else {
			await authServices.login({ email, password });
		}
		setReload(!reload);
	};

	const authAsLogin = async () => {
		await authServices.login({ email: 'test@test.com', password: 'testpass' });
		setReload(!reload);
	};

	return (
		<View style={styles.pageContainer}>
			<Text style={styles.title}>Welcome to Postboard!</Text>
			<View style={styles.inputContainer}>
				<Text>Email</Text>
				<TextInput
					style={styles.input}
					value={email}
					onChangeText={(e) => setEmail(e)}
				/>
				{isRegister && (
					<>
						<Text>Username</Text>
						<TextInput
							style={styles.input}
							value={username}
							onChangeText={(e) => setUsername(e)}
						/>
					</>
				)}
				<Text>Password</Text>
				<TextInput
					style={styles.input}
					value={password}
					secureTextEntry
					onChangeText={(e) => setPassword(e)}
				/>
				{isRegister ? (
					<Button title='Register' onPress={authHandler} />
				) : (
					<>
						<Button title='Login' onPress={authHandler} />
						<Button title='Login as test' onPress={authAsLogin} />
					</>
				)}
				<Button
					title={`${isRegister ? 'Already' : `Don't`} have an account?`}
					onPress={() => setIsRegister(!isRegister)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
	},
	inputContainer: {
		flex: 5,
		marginTop: 32,
		maxHeight: 320,
		width: '90%',
		borderRadius: 10,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: '#f8f8ff',
	},
	input: {
		width: '90%',
		height: 30,
		borderRadius: 10,
		backgroundColor: 'white',
	},
});
