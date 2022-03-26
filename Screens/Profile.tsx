import { StyleSheet, View } from 'react-native';
import React from 'react';
import ProfileHeader from '../Components/Profile/ProfileHeader';
import ProfilePosts from '../Components/Profile/ProfilePosts';

export default function Profile({
	setReload,
	reload,
	userId,
}: {
	setReload: any;
	reload: boolean;
	userId: string;
}) {
	return (
		<View style={styles.page}>
			<ProfilePosts userId={userId} setReload={setReload} reload={reload} />
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: 'flex-start',
	},
});
