import { View, Text, Image, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import apiServices from '../../api/api.service';

const ProfileHeader = ({
	setReload,
	reload,
	userId,
}: {
	setReload?: any;
	reload?: boolean;
	userId: string;
}) => {
	const [name, setName] = useState('Loading ...');
	const [avatar, setAvatar] = useState('https://picsum.photos/50/50.jpg');

	useEffect(() => {
		const postData = { user: userId };
		apiServices.fetchUserName({ userId, setName });
		apiServices.fetchPostImage({ postData, setAvatar });
	}, []);

	const logoutHandler = async () => {
		await SecureStore.deleteItemAsync('token');
		if (setReload) {
			setReload(!reload);
		}
	};

	return (
		<View style={styles.header}>
			<Image
				source={{ uri: avatar }}
				style={{ width: 50, height: 50, borderRadius: 30 }}
			/>
			<Text>{name}</Text>
			{/* <Text>Follow button here</Text> */}
			<Button title='Logout' onPress={logoutHandler} />
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginVertical: 16,
	},
});

export default ProfileHeader;
