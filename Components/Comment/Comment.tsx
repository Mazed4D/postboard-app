import { View, Text } from 'react-native';
import React from 'react';

type CommentProps = {
	userId: string;
	userName: string;
	avatarUri: string;
	isOwnComment: boolean;
};

const Comment = () => {
	return (
		<View>
			<Text>Comment</Text>
		</View>
	);
};

export default Comment;
