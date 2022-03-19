import axios from 'axios';
import { message } from 'antd';

const config = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
};

const headers = {
	Authorization: `Bearer ${localStorage.getItem('token')}`,
};

const printPosts = async (
	pageNum,
	setPosts,
	setNumberOfPosts,
	followed = false,
	userId
) => {
	let reqString = `${process.env.REACT_APP_API}/posts?page=${pageNum}`;
	if (followed) {
		reqString = `${process.env.REACT_APP_API}/posts/followed?page=${pageNum}`;
	}
	if (userId) {
		reqString = `${process.env.REACT_APP_API}/posts/user/${userId}?page=${pageNum}`;
	}
	try {
		const loadPosts = await axios.get(reqString, config);
		setPosts(loadPosts.data.postIds);
		setNumberOfPosts(loadPosts.data.totalPosts);
	} catch (error) {
		message.error(
			`${error.response.data.msg || error.response.data} (${
				error.response.status
			})`
		);
	}
};

const sendPost = async (text, navigate) => {
	try {
		await axios.post(
			`${process.env.REACT_APP_API}/posts`,
			{
				text,
			},
			config
		);
		navigate(0);
	} catch (error) {
		message.error(
			`${error.response.data.msg || error.response.data} (${
				error.response.status
			})`
		);
	}
};

const editPost = async (text, postId, navigate) => {
	try {
		await axios.patch(
			`${process.env.REACT_APP_API}/posts/${postId}`,
			{
				text,
			},
			config
		);
		navigate(0);
	} catch (error) {
		message.error(
			`${error.response.data.msg || error.response.data} (${
				error.response.status
			})`
		);
	}
};

const addComment = async (postId, text, navigate) => {
	try {
		await axios.post(
			`${process.env.REACT_APP_API}/comments/post/${postId}`,
			{
				text,
			},
			config
		);
		navigate(0);
	} catch (error) {
		message.error(
			`${error.response.data.msg || error.response.data} (${
				error.response.status
			})`
		);
	}
};

const fetchUserName = async (userId, setName) => {
	const user = await axios.get(
		`${process.env.REACT_APP_API}/users/${userId}`,
		config
	);
	setName(user.data.name);
};

const fetchImage = async (userId, setAvatar) => {
	const img = await axios.get(
		`${process.env.REACT_APP_API}/upload/user/${userId}`,
		{ headers: headers }
	);
	setAvatar(`${process.env.REACT_APP_SERVER}/uploads/${img.data.url}`);
};

const fetchComments = async (postId, setComments) => {
	const fetchedComments = await axios.get(
		`${process.env.REACT_APP_API}/comments/post/${postId}`
	);
	if (fetchedComments.status === 200) {
		setComments(fetchedComments.data);
	}
};

//// Post Card Functions

const loadPost = async (id, setPostData) => {
	const resPost = await axios.get(
		`${process.env.REACT_APP_API}/posts/${id}`,
		config
	);
	const data = await resPost.data;
	setPostData(() => {
		return { ...data };
	});
};

const loadLikes = async (id, userId, setLiked, setLikeNumber) => {
	const resLikes = await axios.get(
		`${process.env.REACT_APP_API}/likes/${id}`,
		config
	);
	// CHECK IF POST IS LIKED
	const isLiked = resLikes.data.find((like) => {
		return like.user === userId;
	});
	if (isLiked) {
		setLiked(true);
	}
	setLikeNumber(resLikes.data.length);
};

const fetchPostImage = async (postData, setAvatar) => {
	const img = await axios.get(
		`${process.env.REACT_APP_API}/upload/user/${postData.user}`,
		config
	);
	setAvatar(`${process.env.REACT_APP_SERVER}/uploads/${img.data.url}`);
};

const fetchFollowed = async (postData, setIsFollowed) => {
	try {
		const isFollowed = await axios.get(
			`${process.env.REACT_APP_API}/follow/${postData.user}`,
			config
		);
		setIsFollowed(isFollowed.data.isFollowed);
	} catch (error) {
		message.error(
			`${error.response.data.msg || error.response.data} (${
				error.response.status
			})`
		);
	}
};

const toggleLike = async (
	id,
	setLikeSpin,
	setLikeNumber,
	likeNumber,
	setLiked
) => {
	try {
		setLikeSpin(true);
		const toggleLike = await axios.post(
			`${process.env.REACT_APP_API}/likes/toggle/${id}`,
			{},
			config
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
		message.error(
			`${error.response.data.msg || error.response.data} (${
				error.response.status
			})`
		);
	}
};

const follow = async (postData) => {
	try {
		await axios.post(
			`${process.env.REACT_APP_API}/follow/${postData.user}`,
			{},
			config
		);
	} catch (error) {
		message.error(
			`${error.response.data.msg || error.response.data || error.response} (${
				error.response.status
			})`
		);
	}
};

const deleteComment = async (commentId, navigate) => {
	try {
		await axios.delete(
			`${process.env.REACT_APP_API}/comments/${commentId}`,
			config
		);
		navigate(0);
	} catch (error) {
		message.error(
			`${error.response.data.msg || error.response.data} (${
				error.response.status
			})`
		);
	}
};

const deletePost = async (postId) => {
	try {
		await axios.delete(`${process.env.REACT_APP_API}/posts/${postId}`, config);
		return true;
	} catch (error) {
		message.error(
			`${error.response.data.msg || error.response.data} (${
				error.response.status
			})`
		);
	}
};

const editComment = async (commentId, text, navigate) => {
	try {
		await axios.patch(
			`${process.env.REACT_APP_API}/comments/${commentId}`,
			{
				text,
			},
			config
		);
		navigate(0);
	} catch (error) {
		message.error(
			`${error.response.data.msg || error.response.data} (${
				error.response.status
			})`
		);
	}
};

const fetchFollowCount = async (userId, setFollowsCount, setFollowerCount) => {
	try {
		const followObj = await axios.get(
			`${process.env.REACT_APP_API}/follow/${userId}/followCount`,
			config
		);
		setFollowsCount(followObj.data.followsCount);
		setFollowerCount(followObj.data.followerCount);
	} catch (error) {
		message.error(
			`${error.response.data.msg || error.response.data} (${
				error.response.status
			})`
		);
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
