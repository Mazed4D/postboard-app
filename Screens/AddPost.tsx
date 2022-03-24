import { View, Text } from 'react-native';
import React from 'react';
import AddPostCard from '../Components/AddPost/AddPostCard';

const AddPost = ({ navigation }: { navigation: any }) => {
	return <AddPostCard navigation={navigation} />;
};

export default AddPost;
