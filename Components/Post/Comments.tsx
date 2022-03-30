import { SectionList, Text, FlatList, Button, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import Comment from '../Comment/Comment';
import Card from './Card';
import apiServices from '../../api/api.service';
import { useNavigation } from '@react-navigation/native';
import AddPostCard from '../AddPost/AddPostCard';

const Comments = ({ userId, postId }: { userId: string; postId: string }) => {
	const [comments, setComments] = useState<any>([]);
	const [visible, setVisible] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const navigation = useNavigation();

	useEffect(() => {
		apiServices.fetchComments({ postId, setComments });
		setRefreshing(false);
	}, [refreshing]);

	const openModal = () => {
		setVisible(true);
	};

	const closeModal = async () => {
		setRefreshing(true);
		setVisible(false);
	};

	const endReached = async () => {
		setRefreshing(true);
	};

	return (
		<>
			<Modal visible={visible} onRequestClose={closeModal}>
				<AddPostCard
					closeModal={closeModal}
					navigation={navigation}
					isComment={true}
					editPostId={postId}
				/>
			</Modal>
			<FlatList
				data={comments}
				renderItem={(comment) => {
					return (
						<Comment
							key={comment.item._id}
							commentId={comment.item._id}
							user={comment.item.username}
							userId={comment.item.user}
							text={comment.item.text}
						/>
					);
				}}
				ListHeaderComponent={
					<>
						<Card
							userId={userId}
							postId={postId}
							isPostScreen={true}
							reload={() => navigation.goBack()}
						/>
						<Button title='Add comment' onPress={openModal} />
					</>
				}
				onEndReached={endReached}
				refreshing={refreshing}
				onRefresh={() => setRefreshing(true)}
			/>
		</>
	);
};

export default Comments;
