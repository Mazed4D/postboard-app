import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const ProfileHeader = () => {
	return (
		<View style={styles.header}>
			<Image
				source={{ uri: 'https://picsum.photos/50/50.jpg' }}
				style={{ width: 50, height: 50, borderRadius: 30 }}
			/>
			<Text>[User name]</Text>
			<Text>Follow button here</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 16,
	},
});

export default ProfileHeader;
