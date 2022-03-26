import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import apiServices from '../../api/api.service';

type CommentProps = {
	commentId: string;
	userId: string;
	user: string;
	text: string;
};

const Comment = ({ commentId, userId, user, text }: CommentProps) => {
	const [avatar, setAvatar] = useState<any>('https://picsum.photos/50/50.jpg');

	useEffect(() => {
		const postData = { user: userId };
		apiServices.fetchPostImage({ postData, setAvatar });
	});

	return (
		<View style={styles.commentContainer}>
			<View style={styles.meta}>
				<Image
					source={{ uri: avatar }}
					style={{ width: 50, height: 50, borderRadius: 30 }}
				/>
				<Text>{user}</Text>
				<Text>Follow</Text>
			</View>
			<Text style={styles.text}>{text}</Text>
			<View style={styles.actions}>
				<Text>Edit</Text>
				<Text>Delete</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	commentContainer: {
		flex: 1,
		padding: 30,
	},
	meta: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	actions: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	text: {
		marginTop: 10,
		marginBottom: 10,
	},
});

export default Comment;
