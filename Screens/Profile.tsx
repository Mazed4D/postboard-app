import { StyleSheet, Text, ScrollView } from 'react-native';
import React from 'react';
import ProfileHeader from '../Components/Profile/ProfileHeader';
import ProfilePosts from '../Components/Profile/ProfilePosts';

export default function Profile() {
	return (
		<ScrollView style={styles.page}>
			<ProfileHeader />
			<ProfilePosts />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
});
