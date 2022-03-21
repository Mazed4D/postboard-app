import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const AddPostCard = () => {
	const [text, setText] = useState('');

	const submitPostHandler = () => {
		console.log('done');
	};

	return (
		<View style={styles.addPostCard}>
			<Text style={{ fontSize: 20 }}>Add post</Text>
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
