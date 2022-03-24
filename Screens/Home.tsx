import { FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from '../Components/Post/Card';
import apiServices from '../api/api.service';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';

export const Home = ({ userId }: { userId: string }) => {
	const [posts, setPosts] = useState<Array<string>>([]);
	const [numberOfPosts, setNumberOfPosts] = useState<number>(0);
	const [pageNum, setPageNum] = useState<number>(1);
	const isFocused = useIsFocused();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
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
	}, [pageNum, isFocused]);

	return (
		<>
			{posts && (
				<FlatList
					data={posts}
					renderItem={(post) => {
						return <Card postId={post.item} key={post.item} userId={userId} />;
					}}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({});

export default Home;
