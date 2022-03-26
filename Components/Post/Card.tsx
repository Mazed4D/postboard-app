import { View, Text, Button, StyleSheet, Image } from 'react-native';
import React from 'react';
import PostButton from '../Elements/PostButton';
import { useEffect, useState } from 'react';
import apiServices from '../../api/api.service';
import { useNavigation } from '@react-navigation/native';

type cardProps = {
	postId: string;
	userId: string;
	isPostScreen?: boolean;
};

const Card = ({ postId, userId, isPostScreen = false }: cardProps) => {
	const [postData, setPostData] = useState<any>();
	const [avatar, setAvatar] = useState<any>('https://picsum.photos/50/50.jpg');
	const [likeNumber, setLikeNumber] = useState<any>(0);
	const [liked, setLiked] = useState<any>(false);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchPostdata = async () => {
			await apiServices.loadPost({ postId, setPostData });
		};
		const fetchImage = async () => {
			await apiServices.fetchPostImage({ postData, setAvatar });
		};
		const fetchLikes = async () => {
			const id = postData._id;
			await apiServices.loadLikes({ id, userId, setLiked, setLikeNumber });
		};
		if (!postData) {
			fetchPostdata();
		} else {
			fetchImage();
			fetchLikes();
		}
	}, [postData]);

	const tempFunc = () => {
		console.log('done');
	};

	const openPostScreen = () => {
		navigation.navigate('Post' as never, { userId, postId } as never);
	};

	return (
		<View style={styles.cardContainer}>
			<View style={styles.meta}>
				<Image
					source={{ uri: avatar }}
					style={{ width: 50, height: 50, borderRadius: 30 }}
				/>
				<Text>{postData ? postData.name : 'Loading...'}</Text>
				<PostButton title='Follow' onPress={tempFunc} />
			</View>
			<View style={styles.content}>
				<Text>{postData ? postData.text : 'Loading...'}</Text>
			</View>
			<View style={styles.actions}>
				<PostButton
					title={`${likeNumber}`}
					onPress={tempFunc}
					iconName='thumbs-up'
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
						<PostButton title='Edit' onPress={tempFunc} iconName='edit-3' />
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
