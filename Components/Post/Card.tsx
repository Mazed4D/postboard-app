import {
	View,
	Text,
	Button,
	StyleSheet,
	Image,
	Modal,
	Pressable,
} from 'react-native';
import React from 'react';
import PostButton from '../Elements/PostButton';
import { useEffect, useState } from 'react';
import apiServices from '../../api/api.service';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons/';
import AddPostCard from '../AddPost/AddPostCard';
import DeleteConfirm from '../Elements/DeleteConfirm';

type cardProps = {
	postId: string;
	userId: string;
	isPostScreen?: boolean;
	reload: any;
};

const Card = ({ postId, userId, isPostScreen = false, reload }: cardProps) => {
	const [postData, setPostData] = useState<any>();
	const [avatar, setAvatar] = useState<string>('user');
	const [likeNumber, setLikeNumber] = useState<any>(0);
	const [liked, setLiked] = useState<any>(false);
	const [likeSpin, setLikeSpin] = useState(false);
	const [isFollowed, setIsFollowed] = useState(false);
	const [visible, setVisible] = useState(false);
	const [visibleDelete, setVisibleDelete] = useState(false);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchPostdata = async () => {
			await apiServices.loadPost({ postId, setPostData });
		};
		const fetchImage = async () => {
			await apiServices.fetchPostImage({ postData, setAvatar });
		};
		const fetchLikes = async () => {
			const id = postId;
			await apiServices.loadLikes({ id, userId, setLiked, setLikeNumber });
		};
		if (!postData) {
			fetchPostdata();
			fetchLikes();
		} else {
			fetchImage();
			apiServices.fetchFollowed({ postData, setIsFollowed });
		}
	}, [postData]);

	const likeHandler = () => {
		apiServices.toggleLike({
			id: postId,
			setLikeSpin,
			setLikeNumber,
			likeNumber,
			setLiked,
		});
	};

	const followHandler = async () => {
		apiServices.follow(postData);
		setIsFollowed(!isFollowed);
	};

	const openPostScreen = () => {
		navigation.navigate('Post' as never, { userId, postId } as never);
	};

	const confirmDelete = () => {
		apiServices.deletePost(postId);
		setVisibleDelete(false);
		reload();
	};

	const editHandler = () => {
		setVisible(true);
	};

	const navigateToProfile = () => {
		navigation.navigate(
			'HomeProfile' as never,
			{ userId: postData.user } as never
		);
	};

	return (
		<View style={styles.cardContainer}>
			<Modal
				transparent={true}
				visible={visible}
				onRequestClose={() => setVisible(false)}
			>
				{postData && (
					<AddPostCard
						navigation={navigation}
						edit={true}
						editText={postData.text}
						editPostId={postId}
						closeModal={() => setVisible(false)}
					/>
				)}
			</Modal>
			<Modal
				transparent={true}
				visible={visibleDelete}
				onRequestClose={() => setVisibleDelete(false)}
			>
				{postData && (
					<DeleteConfirm
						cancel={() => setVisibleDelete(false)}
						confirm={confirmDelete}
					/>
				)}
			</Modal>
			<View style={styles.meta}>
				<Pressable onPress={navigateToProfile}>
					{avatar !== 'user' && (
						<Image source={{ uri: avatar }} style={styles.image} />
					)}

					{avatar === 'user' && (
						<Feather name={'user'} size={50} color='blue' />
					)}
				</Pressable>

				<Text>{postData ? postData.name : 'Loading...'}</Text>

				{postData !== undefined && !(postData.user === userId) ? (
					<PostButton
						title={isFollowed ? 'Unfollow' : 'Follow'}
						onPress={followHandler}
					/>
				) : (
					<View />
				)}
			</View>
			<View style={styles.content}>
				<Text>{postData ? postData.text : 'Loading...'}</Text>
			</View>
			<View style={styles.actions}>
				<PostButton
					title={`${likeNumber}`}
					onPress={likeHandler}
					iconName={liked ? 'thumbs-down' : 'thumbs-up'}
				/>
				{!isPostScreen && (
					<PostButton
						title='Comment'
						onPress={openPostScreen}
						iconName='message-square'
					/>
				)}
				{postData !== undefined && userId === postData.user && (
					<>
						<PostButton title='Edit' onPress={editHandler} iconName='edit-3' />
						<PostButton
							title='Delete'
							onPress={() => setVisibleDelete(true)}
							iconName='trash'
						/>
					</>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		padding: 15,
		backgroundColor: '#f8f8ff',
		flex: 1,
		justifyContent: 'center',
		flexGrow: 1,
	},
	meta: {
		paddingHorizontal: 30,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	content: {
		margin: 16,
	},
	actions: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	image: {
		width: 55,
		height: 55,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: '#7575FF',
	},
});

export default Card;
