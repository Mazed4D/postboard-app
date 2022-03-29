import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import apiServices from '../../api/api.service';

const AddPostCard = ({
	navigation,
	edit = false,
	closeModal,
	editText = '',
	editPostId = '',
}: {
	navigation: any;
	edit?: boolean;
	closeModal: any;
	editText?: string;
	editPostId?: string;
}) => {
	const [text, setText] = useState(editText);
	const [loading, setLoading] = useState(false);

	const submitPostHandler = () => {
		const { navigate } = navigation;
		setText('');
		if (edit) {
			apiServices.editPost({ text: text, postId: editPostId, navigate });
		} else {
			apiServices.sendPost({ text, navigate });
		}
		closeModal();
	};

	return (
		<View style={styles.addPostCard}>
			<Text style={{ fontSize: 20 }}>{edit ? 'Edit post' : 'Add post'}</Text>
			<TextInput
				style={styles.text}
				multiline={true}
				placeholder='Type your post here'
				maxLength={280}
				value={text}
				onChangeText={(e) => setText(e)}
			/>
			<Button title='Submit post' onPress={submitPostHandler} />
		</View>
	);
};

const styles = StyleSheet.create({
	addPostCard: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: 'white',
		// alignItems: 'center',
	},
	text: {
		padding: 10,
		textAlignVertical: 'top',
		backgroundColor: '#f8f8ff',
		borderRadius: 10,
		marginTop: 10,
		marginBottom: 10,
		height: 120,
	},
});

export default AddPostCard;
