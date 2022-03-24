import { FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from '../Components/Post/Card';
import apiServices from '../api/api.service';
import * as SecureStore from 'expo-secure-store';

export const Home = () => {
	const [posts, setPosts] = useState<Array<string>>([]);
	const [numberOfPosts, setNumberOfPosts] = useState<number>(0);
	const [pageNum, setPageNum] = useState<number>(1);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const userId = await SecureStore.getItemAsync('token');
				await apiServices.printPosts({
					pageNum,
					setPosts,
					setNumberOfPosts,
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchUsers();
	}, [pageNum]);

	return (
		<>
			{posts && (
				<FlatList
					data={posts}
					renderItem={(post) => {
						return <Card postId={post.item} key={post.item} />;
					}}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({});

export default Home;
