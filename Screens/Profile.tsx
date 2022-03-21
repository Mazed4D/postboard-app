import { StyleSheet, View } from 'react-native';
import React from 'react';
import ProfileHeader from '../Components/Profile/ProfileHeader';
import ProfilePosts from '../Components/Profile/ProfilePosts';

export default function Profile() {
	return (
		<View style={styles.page}>
			<ProfileHeader />
			<ProfilePosts />
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: 'flex-start',
	},
});
