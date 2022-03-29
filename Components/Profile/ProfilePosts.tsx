import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import Card from '../Post/Card';
import { useEffect, useState } from 'react';
import apiServices from '../../api/api.service';
import { useIsFocused } from '@react-navigation/native';
import ProfileHeader from './ProfileHeader';

const ProfilePosts = ({
	userId,
	setReload,
	reload,
}: {
	userId: string;
	setReload: any;
	reload: any;
}) => {
	const [posts, setPosts] = useState<Array<any>>([]);
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
					userId,
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
						return (
							<Card
								postId={post.item.postId}
								key={post.item.updatedAt}
								userId={userId}
							/>
						);
					}}
					ListHeaderComponent={
						<ProfileHeader
							setReload={setReload}
							reload={reload}
							userId={userId}
						/>
					}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({});

export default ProfilePosts;
