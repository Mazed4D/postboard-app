import { View, Text, StyleSheet, Image, Button, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import apiServices from '../../api/api.service';
import AddPostCard from '../AddPost/AddPostCard';
import { useNavigation } from '@react-navigation/native';
import DeleteConfirm from '../Elements/DeleteConfirm';

type CommentProps = {
	commentId: string;
	userId: string;
	user: string;
	text: string;
	loggedUserId: string;
};

const Comment = ({
	commentId,
	userId,
	user,
	text,
	loggedUserId,
}: CommentProps) => {
	const [avatar, setAvatar] = useState<any>('https://picsum.photos/50/50.jpg');
	const [visible, setVisible] = useState(false);
	const [visibleDelete, setVisibleDelete] = useState(false);
	const navigation = useNavigation();

	useEffect(() => {
		const postData = { user: userId };
		apiServices.fetchPostImage({ postData, setAvatar });
	});

	const editHandler = () => {
		setVisible(true);
	};

	const deleteHandler = () => {
		apiServices.deleteComment({ commentId, navigate: navigation.navigate });
		navigation.goBack();
	};

	const closeModal = () => {
		setVisible(false);
		setVisibleDelete(false);
	};

	return (
		<View style={styles.commentContainer}>
			<Modal visible={visible} onRequestClose={closeModal}>
				<AddPostCard
					closeModal={closeModal}
					navigation={navigation}
					edit={true}
					editText={text}
					isComment={true}
					editPostId={commentId}
				/>
			</Modal>
			<Modal visible={visibleDelete} onRequestClose={closeModal}>
				<DeleteConfirm
					cancel={closeModal}
					confirm={deleteHandler}
					isComment={true}
				/>
			</Modal>
			<View style={styles.meta}>
				<Image
					source={{ uri: avatar }}
					style={{ width: 50, height: 50, borderRadius: 30 }}
				/>
				<Text>{user}</Text>
			</View>
			<Text style={styles.text}>{text}</Text>
			{loggedUserId === userId && (
				<View style={styles.actions}>
					<Button title='Edit' onPress={editHandler} />
					<Button title='Delete' onPress={() => setVisibleDelete(true)} />
				</View>
			)}
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
		justifyContent: 'space-between',
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
		alignSelf: 'center',
	},
});

export default Comment;
