import { View, Text, Button, StyleSheet, Image, Modal } from 'react-native';
import React from 'react';
import PostButton from '../Elements/PostButton';
import { useEffect, useState } from 'react';
import apiServices from '../../api/api.service';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons/';
import AddPostCard from '../AddPost/AddPostCard';

type cardProps = {
	postId: string;
	userId: string;
	isPostScreen?: boolean;
};

const Card = ({ postId, userId, isPostScreen = false }: cardProps) => {
	const [postData, setPostData] = useState<any>();
	const [avatar, setAvatar] = useState<string>('user');
	const [likeNumber, setLikeNumber] = useState<any>(0);
	const [liked, setLiked] = useState<any>(false);
	const [likeSpin, setLikeSpin] = useState(false);
	const [isFollowed, setIsFollowed] = useState(false);
	const [visible, setVisible] = useState(false);
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

	const tempFunc = () => {};

	const confirmDelete = () => {
		apiServices.deletePost(postId);
	};

	const editHandler = () => {
		setVisible(true);
	};

	return (
		<View style={styles.cardContainer}>
			<Modal
				transparent={true}
				visible={visible}
				onRequestClose={() => setVisible(false)}
			>
				<AddPostCard
					navigation={navigation}
					edit={true}
					editText={postData.text}
				/>
			</Modal>
			<View style={styles.meta}>
				{avatar !== 'user' && (
					<Image
						source={{ uri: avatar }}
						style={{ width: 50, height: 50, borderRadius: 30 }}
					/>
				)}
				{avatar === 'user' && <Feather name={'user'} size={50} color='blue' />}
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
						<PostButton title='Delete' onPress={tempFunc} iconName='trash' />
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
});

export default Card;
