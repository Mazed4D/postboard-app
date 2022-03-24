import { View, Text, Image, StyleSheet, Button } from 'react-native';
import React from 'react';
import * as SecureStore from 'expo-secure-store';

const ProfileHeader = ({
	setReload,
	reload,
}: {
	setReload: any;
	reload: boolean;
}) => {
	const logoutHandler = async () => {
		await SecureStore.deleteItemAsync('token');
		setReload(!reload);
	};

	return (
		<View style={styles.header}>
			<Image
				source={{ uri: 'https://picsum.photos/50/50.jpg' }}
				style={{ width: 50, height: 50, borderRadius: 30 }}
			/>
			<Text>[User name]</Text>
			{/* <Text>Follow button here</Text> */}
			<Button title='Logout' onPress={logoutHandler} />
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flex: 1,
		minHeight: 70,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 16,
	},
});

export default ProfileHeader;
