import { FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from '../Components/Post/Card';
import apiServices from '../api/api.service';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';

export const Home = ({ userId }: { userId: string }) => {
	const [posts, setPosts] = useState<Array<string>>([]);
	const [displayPosts, setDisplayPosts] = useState<Array<string>>([]);
	const [numberOfPosts, setNumberOfPosts] = useState<number>(0);
	const [maxPage, setMaxPage] = useState<number>(1);
	const [pageNum, setPageNum] = useState<number>(1);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const isFocused = useIsFocused();

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
	}, [isFocused, refreshing]);

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
						return <Card postId={post.item} key={post.item} userId={userId} />;
					}}
					onEndReached={handleEndReached}
					onEndReachedThreshold={0.1}
					refreshing={refreshing}
					onRefresh={handleRefresh}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({});

export default Home;
