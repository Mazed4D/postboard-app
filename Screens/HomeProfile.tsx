import { StyleSheet, View } from 'react-native';
import React from 'react';
import ProfilePosts from '../Components/Profile/ProfilePosts';
import { useRoute } from '@react-navigation/native';

export default function HomeProfile() {
	const { params } = useRoute();
	//@ts-ignore
	const profileId = params.userId;

	return (
		<View style={styles.page}>
			<ProfilePosts userId={profileId} />
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: 'flex-start',
	},
});
