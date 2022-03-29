import { StyleSheet, FlatList, Modal } from 'react-native';
import React from 'react';
import Card from '../Components/Post/Card';
import { useEffect, useState } from 'react';
import apiServices from '../api/api.service';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AddPostCard from '../Components/AddPost/AddPostCard';
import AddPostButton from '../Components/Layout/AddPostButton';

const Followed = ({ userId }: { userId: string }) => {
	const [posts, setPosts] = useState<Array<any>>([]);
	const [displayPosts, setDisplayPosts] = useState<Array<any>>([]);
	const [numberOfPosts, setNumberOfPosts] = useState<number>(0);
	const [maxPage, setMaxPage] = useState<number>(1);
	const [pageNum, setPageNum] = useState<number>(1);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const [visible, setVisible] = useState<boolean>(false);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				await apiServices.printPosts({
					pageNum,
					setPosts: setDisplayPosts,
					setNumberOfPosts,
					followed: true,
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchUsers();
		setRefreshing(false);
	}, [refreshing]);

	useEffect(() => {
		setMaxPage(Math.ceil(numberOfPosts / 4));
	}, [numberOfPosts]);

	const handleRefresh = async () => {
		setPageNum(1);
		await apiServices.printPosts({
			pageNum: 1,
			setPosts: setDisplayPosts,
			setNumberOfPosts,
			followed: true,
		});
	};

	const handleEndReached = async () => {
		if (pageNum !== maxPage) {
			await apiServices.printPosts({
				pageNum: pageNum + 1,
				setPosts,
				setNumberOfPosts,
				followed: true,
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
							/>
						);
					}}
					onEndReached={handleEndReached}
					onEndReachedThreshold={0.1}
					refreshing={refreshing}
					onRefresh={handleRefresh}
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

export default Followed;
