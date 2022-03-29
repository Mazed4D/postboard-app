import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import Comments from '../Components/Post/Comments';
import * as SecureStore from 'expo-secure-store';

const Post = ({ route }: { route: any }) => {
	const { postId, userId } = route.params;

	return (
		<View style={styles.page}>
			<Comments userId={userId} postId={postId} key={postId} />
		</View>
	);
};

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
});

export default Post;
