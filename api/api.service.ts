import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const config = async () => {
	const token = await SecureStore.getItemAsync('token');
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

const headers = {
	Authorization: `Bearer ${SecureStore.getItemAsync('token')}`,
};

type printPostsProps = {
	pageNum: number;
	setPosts: any;
	setNumberOfPosts: any;
	followed?: boolean;
	userId?: string | null;
};

const printPosts = async ({
	pageNum,
	setPosts,
	setNumberOfPosts,
	followed = false,
	userId,
}: printPostsProps) => {
	let reqString = `${process.env.REACT_APP_API}/posts?page=${pageNum}`;
	if (followed) {
		reqString = `${process.env.REACT_APP_API}/posts/followed?page=${pageNum}`;
	}
	if (userId) {
		reqString = `${process.env.REACT_APP_API}/posts/user/${userId}?page=${pageNum}`;
	}
	try {
		const loadPosts = await axios.get(reqString, await config());
		setPosts(loadPosts.data.postIds);
		setNumberOfPosts(loadPosts.data.totalPosts);
	} catch (error) {
		console.log(error);
	}
};

type sendPostProps = {
	text: string;
	navigate: Function;
};

const sendPost = async ({ text, navigate }: sendPostProps) => {
	try {
		await axios.post(
			`${process.env.REACT_APP_API}/posts`,
			{
				text,
			},
			await config()
		);
		navigate(0);
	} catch (error) {
		console.log(error);
	}
};

type editPostProps = {
	text: string;
	postId: string;
	navigate: Function;
};

const editPost = async ({ text, postId, navigate }: editPostProps) => {
	try {
		await axios.patch(
			`${process.env.REACT_APP_API}/posts/${postId}`,
			{
				text,
			},
			await config()
		);
		navigate(0);
	} catch (error) {
		console.log(error);
	}
};

type addCommentProps = {
	postId: string;
	text: string;
	navigate: Function;
};

const addComment = async ({ postId, text, navigate }: addCommentProps) => {
	try {
		await axios.post(
			`${process.env.REACT_APP_API}/comments/post/${postId}`,
			{
				text,
			},
			await config()
		);
		navigate(0);
	} catch (error) {
		console.log(error);
	}
};

type fetchUserNameProps = {
	userId: string;
	setName: Function;
};

const fetchUserName = async ({ userId, setName }: fetchUserNameProps) => {
	const user = await axios.get(
		`${process.env.REACT_APP_API}/users/${userId}`,
		await config()
	);
	setName(user.data.name);
};

type fetchImageProps = {
	userId: string;
	setAvatar: Function;
};
const fetchImage = async ({ userId, setAvatar }: fetchImageProps) => {
	const img = await axios.get(
		`${process.env.REACT_APP_API}/upload/user/${userId}`,
		{ headers: headers }
	);
	setAvatar(`${process.env.REACT_APP_SERVER}/uploads/${img.data.url}`);
};

type fetchCommentsProps = {
	postId: string;
	setComments: Function;
};

const fetchComments = async ({ postId, setComments }: fetchCommentsProps) => {
	const fetchedComments = await axios.get(
		`${process.env.REACT_APP_API}/comments/post/${postId}`
	);
	if (fetchedComments.status === 200) {
		setComments(fetchedComments.data);
	}
};

//// Post Card Functions

type loadPostProps = {
	postId: string;
	setPostData: Function;
};

const loadPost = async ({ postId, setPostData }: loadPostProps) => {
	const resPost = await axios.get(
		`${process.env.REACT_APP_API}/posts/${postId}`,
		await config()
	);
	const data = await resPost.data;
	setPostData(() => {
		return { ...data };
	});
};

type loadLikesProps = {
	id: string;
	userId: string;
	setLiked: Function;
	setLikeNumber: Function;
};

const loadLikes = async ({
	id,
	userId,
	setLiked,
	setLikeNumber,
}: loadLikesProps) => {
	const resLikes = await axios.get(
		`${process.env.REACT_APP_API}/likes/${id}`,
		await config()
	);
	// CHECK IF POST IS LIKED
	const isLiked = resLikes.data.find((like: any) => {
		return like.user === userId;
	});
	if (isLiked) {
		setLiked(true);
	}
	setLikeNumber(resLikes.data.length);
};

type fetchPostImageProps = {
	postData: { user: string };
	setAvatar: Function;
};

const fetchPostImage = async ({ postData, setAvatar }: fetchPostImageProps) => {
	const img = await axios.get(
		`${process.env.REACT_APP_API}/upload/user/${postData.user}`,
		await config()
	);
	setAvatar(`${process.env.REACT_APP_SERVER}/uploads/${img.data.url}`);
};

type fetchFollowedProps = {
	postData: { user: string };
	setIsFollowed: Function;
};

const fetchFollowed = async ({
	postData,
	setIsFollowed,
}: fetchFollowedProps) => {
	try {
		const isFollowed = await axios.get(
			`${process.env.REACT_APP_API}/follow/${postData.user}`,
			await config()
		);
		setIsFollowed(isFollowed.data.isFollowed);
	} catch (error) {
		console.log(error);
	}
};

type toggleLikeProps = {
	id: string;
	setLikeSpin: Function;
	setLikeNumber: Function;
	likeNumber: number;
	setLiked: Function;
};

const toggleLike = async ({
	id,
	setLikeSpin,
	setLikeNumber,
	likeNumber,
	setLiked,
}: toggleLikeProps) => {
	try {
		setLikeSpin(true);
		const toggleLike = await axios.post(
			`${process.env.REACT_APP_API}/likes/toggle/${id}`,
			{},
			await config()
		);
		if (toggleLike.status === 200) {
			setLikeNumber(likeNumber + 1);
			setLiked(true);
		} else if (toggleLike.status === 204) {
			setLikeNumber(likeNumber - 1);
			setLiked(false);
		}
		setLikeSpin(false);
	} catch (error) {
		console.log(error);
	}
};

const follow = async (postData: { user: string }) => {
	try {
		await axios.post(
			`${process.env.REACT_APP_API}/follow/${postData.user}`,
			{},
			await config()
		);
	} catch (error) {
		console.log(error);
	}
};

type deleteCommentProps = {
	commentId: string;
	navigate: Function;
};

const deleteComment = async ({ commentId, navigate }: deleteCommentProps) => {
	try {
		await axios.delete(
			`${process.env.REACT_APP_API}/comments/${commentId}`,
			await config()
		);
		navigate(0);
	} catch (error) {
		console.log(error);
	}
};

const deletePost = async (postId: string) => {
	try {
		await axios.delete(
			`${process.env.REACT_APP_API}/posts/${postId}`,
			await config()
		);
		return true;
	} catch (error) {
		console.log(error);
	}
};

type editCommentProps = {
	commentId: string;
	text: string;
	navigate: Function;
};

const editComment = async ({ commentId, text, navigate }: editCommentProps) => {
	try {
		await axios.patch(
			`${process.env.REACT_APP_API}/comments/${commentId}`,
			{
				text,
			},
			await config()
		);
		navigate(0);
	} catch (error) {
		console.log(error);
	}
};

type fetchFollowCountProps = {
	userId: string;
	setFollowsCount: Function;
	setFollowerCount: Function;
};

const fetchFollowCount = async ({
	userId,
	setFollowsCount,
	setFollowerCount,
}: fetchFollowCountProps) => {
	try {
		const followObj = await axios.get(
			`${process.env.REACT_APP_API}/follow/${userId}/followCount`,
			await config()
		);
		setFollowsCount(followObj.data.followsCount);
		setFollowerCount(followObj.data.followerCount);
	} catch (error) {
		console.log(error);
	}
};

const apiServices = {
	headers,
	printPosts,
	sendPost,
	addComment,
	fetchUserName,
	fetchImage,
	fetchComments,
	loadPost,
	loadLikes,
	fetchPostImage,
	fetchFollowed,
	toggleLike,
	follow,
	deleteComment,
	deletePost,
	editPost,
	editComment,
	fetchFollowCount,
};

export default apiServices;
