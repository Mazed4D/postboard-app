import { SectionList, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Comment from '../Comment/Comment';
import Card from './Card';
import apiServices from '../../api/api.service';

const Comments = ({ userId, postId }: { userId: string; postId: string }) => {
	const [comments, setComments] = useState<any>([]);

	useEffect(() => {
		apiServices.fetchComments({ postId, setComments });
	}, []);

	return (
		<FlatList
			data={comments}
			renderItem={(comment) => {
				return (
					<Comment
						key={comment.item.user}
						commentId={comment.item._id}
						user={comment.item.username}
						userId={comment.item.user}
						text={comment.item.text}
					/>
				);
			}}
			ListHeaderComponent={
				<Card userId={userId} postId={postId} isPostScreen={true} />
			}
		/>
	);
};

export default Comments;
