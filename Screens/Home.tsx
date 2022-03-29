import { FlatList, Modal, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FloatingAction } from 'react-native-floating-action';
import Card from '../Components/Post/Card';
import apiServices from '../api/api.service';
import { Feather } from '@expo/vector-icons/';
import AddPostButton from '../Components/Layout/AddPostButton';
import AddPostCard from '../Components/AddPost/AddPostCard';
import { useNavigation } from '@react-navigation/native';

export const Home = ({ userId }: { userId: string }) => {
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
		});
	};

	const handleEndReached = async () => {
		if (pageNum !== maxPage) {
			await apiServices.printPosts({
				pageNum: pageNum + 1,
				setPosts,
				setNumberOfPosts,
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

export default Home;
