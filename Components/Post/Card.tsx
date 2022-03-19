import { View, Text, Button, StyleSheet, Image } from 'react-native';
import React from 'react';
import PostButton from '../Elements/PostButton';

const Card = () => {
	const tempFunc = () => {
		console.log('done');
	};

	return (
		<View style={styles.cardContainer}>
			<View style={styles.meta}>
				<Image
					source={{ uri: 'https://picsum.photos/50/50.jpg' }}
					style={{ width: 50, height: 50, borderRadius: 30 }}
				/>
				<Text>[User name]</Text>
				<PostButton title='Follow' onPress={tempFunc} />
			</View>
			<View style={styles.content}>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
					deleniti aliquam placeat natus iste velit eveniet illo architecto
					tempore corrupti officiis consequatur temporibus, debitis soluta et
					eos pariatur beatae quam.
				</Text>
			</View>
			<View style={styles.actions}>
				<PostButton title='Like' onPress={tempFunc} iconName='thumbs-up' />
				<PostButton
					title='Comment'
					onPress={tempFunc}
					iconName='message-square'
				/>
				<PostButton title='Edit' onPress={tempFunc} iconName='edit-3' />
				<PostButton title='Delete' onPress={tempFunc} iconName='trash' />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		padding: 15,
		backgroundColor: '#f8f8ff',
		flex: 1,
		justifyContent: 'center',
	},
	meta: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	content: {
		margin: '1rem',
	},
	actions: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
});

export default Card;
