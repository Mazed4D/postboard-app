import { FlatList, Modal, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import apiServices from '../../api/api.service';
import Card from '../Post/Card';
import AddPostCard from '../AddPost/AddPostCard';
import AddPostButton from '../Layout/AddPostButton';

const printPosts = async ({
	pageNum,
	setDisplayPosts,
	setNumberOfPosts,
	isFollowed = false,
	isProfile = false,
	userId = '',
}: {
	pageNum: number;
	setDisplayPosts: any;
	setNumberOfPosts: any;
	isFollowed?: boolean;
	isProfile?: boolean;
	userId?: string;
}) => {
	try {
		if (isFollowed) {
			await apiServices.printPosts({
				pageNum,
				setPosts: setDisplayPosts,
				setNumberOfPosts,
				followed: true,
			});
		} else if (isProfile) {
			await apiServices.printPosts({
				pageNum,
				setPosts: setDisplayPosts,
				setNumberOfPosts,
				userId,
			});
		} else {
			await apiServices.printPosts({
				pageNum,
				setPosts: setDisplayPosts,
				setNumberOfPosts,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

export const Feed = ({
	userId,
	isFollowed,
	isProfile,
	listHeaderComponent = () => <></>,
}: {
	userId: string;
	isFollowed?: boolean;
	isProfile?: boolean;
	listHeaderComponent?: any;
}) => {
	const [posts, setPosts] = useState<Array<any>>([]);
	const [displayPosts, setDisplayPosts] = useState<Array<any>>([]);
	const [numberOfPosts, setNumberOfPosts] = useState<number>(0);
	const [maxPage, setMaxPage] = useState<number>(1);
	const [pageNum, setPageNum] = useState<number>(1);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const [visible, setVisible] = useState<boolean>(false);
	const navigation = useNavigation();

	useEffect(() => {
		printPosts({
			pageNum,
			setDisplayPosts,
			setNumberOfPosts,
			isFollowed: isFollowed,
			isProfile: isProfile,
			userId,
		});
		setRefreshing(false);
	}, [refreshing]);

	useEffect(() => {
		setMaxPage(Math.ceil(numberOfPosts / 4));
	}, [numberOfPosts]);

	const handleRefresh = async () => {
		setPageNum(1);
		printPosts({
			pageNum: 1,
			setDisplayPosts,
			setNumberOfPosts,
			isFollowed: isFollowed,
			isProfile: isProfile,
			userId,
		});
	};

	const handleEndReached = async () => {
		if (pageNum !== maxPage) {
			await printPosts({
				pageNum: pageNum + 1,
				setDisplayPosts: setPosts,
				setNumberOfPosts,
				isFollowed: isFollowed,
				isProfile: isProfile,
				userId,
			});
			setPageNum(pageNum + 1);
			setDisplayPosts(() => {
				return [...displayPosts, ...posts];
			});
		}
	};

	return (
		<>
			{displayPosts && (
				<FlatList
					data={displayPosts}
					renderItem={(post) => {
						return (
							<Card
								postId={post.item.postId}
								key={post.item.postId + post.item.updatedAt}
								userId={userId}
								reload={() => setRefreshing(true)}
							/>
						);
					}}
					onEndReached={handleEndReached}
					onEndReachedThreshold={0.1}
					refreshing={refreshing}
					onRefresh={handleRefresh}
					ListHeaderComponent={listHeaderComponent}
				/>
			)}
			<Modal
				transparent={true}
				visible={visible}
				onRequestClose={() => setVisible(false)}
			>
				<AddPostCard
					navigation={navigation}
					closeModal={() => setVisible(false)}
				/>
			</Modal>
			<AddPostButton onPress={() => setVisible(true)} />
		</>
	);
};

const styles = StyleSheet.create({});

export default Feed;
