import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

export default function Auth() {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isRegister, setIsRegister] = useState(false);

	const authHandler = () => {};

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
					onChangeText={(e) => setPassword(e)}
				/>
				{isRegister ? (
					<Button title='Register' onPress={() => console.log('e')} />
				) : (
					<Button title='Login' onPress={() => console.log('e')} />
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
		marginTop: '2rem',
		maxHeight: '18rem',
		width: '90%',
		borderRadius: 10,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: '#f8f8ff',
	},
	input: {
		width: '90%',
		height: `1.5rem`,
		borderRadius: 10,
		backgroundColor: 'white',
	},
});
