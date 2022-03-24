import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import Card from '../Components/Post/Card';
import { useEffect, useState } from 'react';
import apiServices from '../api/api.service';
import { useIsFocused } from '@react-navigation/native';

const Followed = ({ userId }: { userId: string }) => {
	const [posts, setPosts] = useState<Array<string>>([]);
	const [numberOfPosts, setNumberOfPosts] = useState<number>(0);
	const [pageNum, setPageNum] = useState<number>(1);
	const isFocused = useIsFocused();

	useEffect(() => {
		const followed = true;
		const fetchUsers = async () => {
			try {
				await apiServices.printPosts({
					pageNum,
					setPosts,
					setNumberOfPosts,
					followed,
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

export default Followed;
