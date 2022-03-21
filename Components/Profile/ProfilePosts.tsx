import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Card from '../Post/Card';

const ProfilePosts = () => {
	return (
		<ScrollView>
			<Card />
			<Card />
			<Card />
			<Card />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	posts: {
		flex: 1,
	},
});

export default ProfilePosts;
